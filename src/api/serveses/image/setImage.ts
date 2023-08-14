import axios from "../../../axios";

export function deleteImageFromDB(name?: string) {
  const res = axios.post("/image/remove/" + name);
  return res;
}

export const uploadImg = async (formData: FormData, path: string) => {
  const res = await axios.post("/" + path, formData);
  return res.data;
};
