import { postImage } from "../queries/imageServer";

export const uploadImg = async (file: File) => {
  const formData = new FormData();
  let url: string = "";

  if (file) {
    formData.append("file", file);
    try {
      const res = await postImage(formData);
      url = res.data.url as string;
      return url;
    } catch (err) {
      console.log(err);
      return;
    }
  }

  return url;
};
