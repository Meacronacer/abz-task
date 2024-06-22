import root from "./loadFile.module.scss";
import { useState } from "react";

interface props {
  register: any;
  errors: any;
  trigger: any;
}

const LoadFile: React.FC<props> = ({ register, errors, trigger }) => {
  const [fileName, setFileName] = useState<string>("");

  return (
    <>
      <div className={root.loadFile}>
        <label
          style={errors.photo && { border: "2px solid #cb3d40" }}
          className={root.uploadLabel}
          htmlFor="img"
        >
          Upload
        </label>
        <input
          {...register("photo", {
            required: "photo is required",
            onChange: (e: any) => {
              setFileName(e.target.files[0].name);
              trigger("photo");
            },
            validate: {
              lessThan5mb: (file: { 0: File }) =>
                file[0]?.size < 500000 ||
                "The photo size must not be greater than 5 Mb.",
              fileFormat: (file: { 0: File }) =>
                file[0]?.name.endsWith(".jpg") ||
                file[0]?.name.endsWith(".jpeg") ||
                "The photo format must be jpeg/jpg type",
            },
          })}
          id="img"
          accept=".jpg, .jpeg"
          type="file"
        />
        <label
          title={fileName}
          style={errors.photo && { border: "2px solid #cb3d40" }}
          className={root.fileName}
          id="img"
        >
          {fileName || "Upload Your photo"}
        </label>
      </div>
      {errors.photo && <span className="error">{errors.photo.message}</span>}
    </>
  );
};

export default LoadFile;
