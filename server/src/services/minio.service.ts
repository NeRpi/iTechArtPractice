import { Client } from "minio";

const minioClient = new Client({
  endPoint: "localhost",
  port: 9000,
  useSSL: false,
  accessKey: "admin",
  secretKey: "minio123",
});

export default class MinioService {
  private minioClient;

  constructor() {
    this.minioClient = minioClient;
  }

  uploadFile(file: string, metaData: object) {
    this.minioClient.fPutObject(
      "itechart",
      "users.csv",
      file,
      metaData,
      function (err, etag) {
        if (err) return console.log(err);
        console.log("File uploaded successfully.");
      }
    );
  }
}
