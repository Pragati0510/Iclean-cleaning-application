const checkProfile = async (userId) => {

  

        let response = await fetch("/api/profile/check",  {
            method: "POST",
            body: JSON.stringify({
             auth0_id: userId
            // auth0_id: 'abc'
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          });
        let status = await response.status;
        console.log(status);
        if (status == 404){
          return false; }
        else if (status == 200) {
        let data = await response.json();
        return data;
        
        }
    }

export default checkProfile;
