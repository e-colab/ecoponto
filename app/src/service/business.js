import axios from "axios";

const getList = async () => {
  console.log("oi")
  const header = {
    "Content-Type": "application/json"
  }
    const resp = await axios.get(
      "http://localhost:3000/empresas", {header}
    );
    console.log("func", resp.data)
    return resp.data;
  };
  
  export default getList;