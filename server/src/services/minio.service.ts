import { Client } from "minio";

export default class MinioService {
  private minioClient;

  constructor() {
    this.minioClient = new Client({
      endPoint: process.env.MINIO_ENDPOINT!,
      port: parseInt(process.env.MINIO_PORT!),
      useSSL: false,
      accessKey: process.env.MINIO_ACCESS_KEY!,
      secretKey: process.env.MINIO_SECRETE_KEY!,
    });
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
