import {useState} from "preact/hooks";
import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";


const LoginPage = () => {
      const [userData, setUserData] = useState({
        email: "",
        password: "",
      });

      const submitHandler = async()=>{
        try{
          const response = await axiod.post('/api/auth/login', userData)
          if(response.status == 200) {
              alert("Login sucessfully");
              localStorage.setItem("token", JSON.stringify(response.data.token));
              window.location.href = "/"
          } else {
            alert(response.data.error);
          }
      } catch (error) {
          alert(error.response.data.error);
          console.error(error)
      }
      };
    return (
        <div class="flex flex-col justify-center items-center gap-4 py-8 bg-gray-800 mx-auto h-screen">
        
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70">
          <path
            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
          <path
            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
        </svg>
        <input type="text" className="grow" placeholder="Email" value={userData.email} onChange ={(e: any)=>setUserData({...userData, email: e.target.value})}/>
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70">
          <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd" />
        </svg>
        <input type="password" className="grow" placeholder={"********"} value={userData.password} onChange={(e: any) => setUserData({...userData, password: e.target.value})} />
      </label>

      <button className="btn btn-success" onClick={submitHandler}>Login</button>

        </div>
    )
}

export default LoginPage