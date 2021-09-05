import { useState, useEffect } from "react";
import { Select, Button, Avatar, Badge } from "antd";
import { SaveOutlined } from "@ant-design/icons";
const { Option } = Select;
const CourseCreateForm = ({
  handleSubmit,
  handleImage,
  handleChange,
  values,
  setValues,
  preview,
  uploadButtonText,
  handleImageRemove = (e) => e,
  editPage = false,
}) => {
  const children = [];
  for (let i = 100; i <= 2000; i += 10) {
    children.push(<Option key={i.toFixed(2)}>₹ {i.toFixed(2)}</Option>);
  }
  return (
    <>
      {values && (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              className="form-control m-1"
              placeholder="Name"
              value={values.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <textarea
              name="description"
              cols="7"
              rows="7"
              value={values.description}
              className="form-control m-1"
              onChange={handleChange}
              placeholder="Course description  (markdown is supported)"
            ></textarea>
            <a
              className="m-1"
              href="https://www.markdownguide.org/cheat-sheet/"
              style={{ color: "#777" }}
              target="_blank"
            >
              For markdown syntax
            </a>
            ||
            <a
              className="m-1"
              href="https://typora.io/"
              style={{ color: "#777" }}
              target="_blank"
            >
              For markdown editor
            </a>
          </div>

          <div className="form-row row">
            <div className="col">
              <div className="col-md-3 form-group m-1">
                <Select
                  style={{ width: "100%" }}
                  size="large"
                  value={values.paid}
                  onChange={(v) => setValues({ ...values, paid: v, price: 0 })}
                >
                  <Option value={true}>Paid</Option>
                  <Option value={false}>Free</Option>
                </Select>
              </div>
            </div>
            {values.paid && (
              <div className=" col-md-6 form-group m-1">
                <Select
                  defaultValue="₹ 100"
                  style={{ width: "100%" }}
                  onChange={(v) => setValues({ ...values, price: v })}
                  tokenSeparators={[,]}
                  size="large"
                >
                  {children}
                </Select>
              </div>
            )}
          </div>

          <div className="form-group">
            <input
              type="text"
              name="category"
              className="form-control m-1"
              placeholder="Category"
              value={values.category}
              onChange={handleChange}
            />
          </div>

          <div className="form-row flex-box-image">
            <div className="col">
              <div className="form-group mt-2">
                <label
                  className="btn btn-outline-secondary btn-block text-left"
                  style={{
                    backgroundColor: "#202030",
                    color: "white",
                  }}
                >
                  {uploadButtonText}
                  <input
                    type="file"
                    style={{ width: "80%" }}
                    name="image"
                    onChange={handleImage}
                    accept="image/*"
                    hidden
                  />
                </label>
                {preview && (
                  <Badge
                    count="X"
                    onClick={handleImageRemove}
                    className="pointer"
                  >
                    <Avatar src={preview} className="avatar-img" />
                  </Badge>
                )}

                {editPage && values.image && (
                  <Avatar
                    width={200}
                    src={values.image.Location}
                    className="avatar-img"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <Button
                onClick={handleSubmit}
                disabled={values.loading || values.uploading}
                className="btn btn-primary mt-2 getting-started"
                style={{ backgroundColor: "#2E47FF", borderColor: "#2E47FF" }}
                loading={values.loading}
                type="primary"
                size="large"
                shape="square"
              >
                {values.loading ? "Saving..." : "Save & Continue"}
              </Button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};
export default CourseCreateForm;
