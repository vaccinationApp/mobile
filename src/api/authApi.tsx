const LOGIN_USER = 'https://vetprof.herokuapp.com/login'

const loginRequest = async (username: string, password: string) => {
    const headers = {
        'Content-Type': 'application/json',
    };
    const body = JSON.stringify({
        username,
        password
      })
    
    const params = {
      method: 'POST',
      headers,
      body
    };
  
    const response = await fetch(`${LOGIN_USER}`, params);
    console.log(response)
    const responseJson = await response.json();
    return responseJson;
  };

  export { loginRequest }