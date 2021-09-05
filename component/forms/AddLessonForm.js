import { Button, Progress, Tooltip } from "antd";
import { CloseCircleFilled, CloseCircleOutlined } from "@ant-design/icons";

const AddLessonForm = ({
  values,
  setValues,
  handleAddLesson,
  uploading,
  uploadButtonText,
  handleVideo,
  progress,
  handleVideoRemove,
}) => {
  return (
    <div className="container pt-3">
      <form onSubmit={handleAddLesson}>
        <input
          type="text"
          className="form-control square"
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          value={values.title}
          placeholder="Title"
          required
          autoFocus
        />
        <textarea
          className="form-control mt-3"
          cols="7"
          rows="7"
          onChange={(e) => setValues({ ...values, content: e.target.value })}
          value={values.content}
          placeholder="Content"
          required
        ></textarea>
        <div className="display_flex">
          <label className="btn btn-dark btn-block text-left mt-3">
            {uploadButtonText}
            <input onChange={handleVideo} type="file" accept="video/*" hidden />
          </label>
          {!uploading && values.video.Location && (
            <Tooltip title="Remove">
              <span onClick={handleVideoRemove} className="pt-1 pl-3">
                <CloseCircleFilled className="text-danger ml-2 d-flex justify-content-center pt-4 pointer" />
              </span>
            </Tooltip>
          )}
        </div>
        <div className="progressbar">
          {progress > 0 && <Progress percent={progress} steps={10} />}
        </div>
        <Button
          onClick={handleAddLesson}
          className="col mt-3 btn-style"
          size="large"
          loading={uploading}
        >
          Save
        </Button>
      </form>
    </div>
  );
};
export default AddLessonForm;
