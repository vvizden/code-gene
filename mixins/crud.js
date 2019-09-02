import { mapGetters } from 'vuex';

export default function() {
  return {
    data() {
      return {
        formDisabled: false,
        unifiedSize: "small",
        tableData: [],
        tableLoading: true,
        total: 0,
        tableQuery: {
          page: 1,
          limit: 20
        },
        form: {},
        rules: {},
        formStatus: {
          create: "创建",
          update: "修改"
        },
        formDialogTitle: "创建",
        formDialogVisible: false,
        formDisplay: true
      };
    },
    computed: {
      ...mapGetters(["permissions"])
    },
    mounted() {
      this.loadTable();
    },
    methods: {
      initForm() {
        this.form = {};
      },
      handleFormDialogClosed() {
        this.formDisplay = false;
        this.initForm();
      },
      loadTable() {
        this.tableLoading = true;
        this.getTableData()
          .then(() => {
            this.tableLoading = false;
          })
          .catch(() => {
            this.tableLoading = false;
          });
      },
      getTableData() {
        return getPage(this.tableQuery)
          .then(res => {
            this.tableData = res.data.records;
            this.total = res.data.total;
            return Promise.resolve();
          })
          .catch(() => {
            return Promise.reject();
          });
      },
      handleSizeChange(val) {
        this.tableQuery.limit = val;
        this.loadTable();
      },
      handleCurrentChange(val) {
        this.tableQuery.page = val;
        this.loadTable();
      },
      handleCreate() {
        this.formDialogTitle = this.formStatus.create;
        this.formDisplay = true;
        this.$nextTick(() => {
          this.formDialogVisible = true;
        });
      },
      submitForm(method) {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.formDisabled = true;
            method(this.form)
              .then(res => {
                this.formDisabled = false;
                if (res.data.code === 0) {
                  this.formDialogVisible = false;
                  this.$notify({
                    title: "成功",
                    message: `${res.data.msg}`,
                    type: "success",
                    duration: 2000
                  });
                  this.loadTable();
                } else {
                  this.$message.error(res.data.msg);
                }
              })
              .catch(() => {
                this.formDisabled = false;
              });
          }
        });
      },
      create() {
        this.submitForm(addObj);
      },
      cancel() {
        this.formDialogVisible = false;
      },
      handleUpdate(row) {
        this.form = { ...row };
        this.formDialogTitle = this.formStatus.update;
        this.$nextTick(() => {
          this.formDialogVisible = true;
        });
      },
      update() {
        this.submitForm(putObj);
      },
      handleDelete(key) {
        this.$confirm("确定删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            delObj(key)
              .then(res => {
                if (res.data.code === 0) {
                  this.$notify({
                    title: "成功",
                    message: "删除成功",
                    type: "success",
                    duration: 2000
                  });
                  this.loadTable();
                } else {
                  this.$message.error(res.data.msg);
                }
              })
              .catch(() => {});
          })
          .catch(() => {});
      }
    }
  };
}
