import { postImage } from "../queries/imageServer";

export const uploadImg = async (file: File, accessToken: string) => {
  const formData = new FormData();
  let url: string = "";

  if (!accessToken) {
    console.log("No access token found");
    return;
  }

  if (file) {
    formData.append("file", file);
    try {
      const res = await postImage(formData, accessToken);
      url = res.data.url as string;
      return url;
    } catch (err) {
      console.log(err);
      return;
    }
  }

  return url;
};
