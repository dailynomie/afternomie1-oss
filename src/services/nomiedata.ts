import chunk from 'lodash/chunk'
import dayjs from 'dayjs'

export const getNomieData = async (url:string, db:string,user:string,pw:string)=>{
    
    var db = 'dn_i9q8mxs2f5dgkg1';
    var user = 'nomieuser_qf5a01nw6p';
    var pw = '8oq!i!Ti80LfdNyv4d';
    url = url+db+'/_all_docs?include_docs=true';
    
    let result = await fetch(url, {
    credentials: 'include',
    headers: {
        "Authorization": "Basic " + btoa(user+":"+pw),
        "Content-Type": "application/x-www-form-urlencoded"
    },
    method: "GET"
})
    .then(response => response.json())
    .then(data => {
        // Handle the JSON response
        //console.log(data);
        return data;
    
    })
    .catch(error => {
        // Handle any errors
        console.error(error);
    });

    var finalresult = await convertData(result)
    return finalresult;
}

async function convertData(data){
    var feedback:Array<Object> = []
    var results = data.rows
    var tmp:Object = {}
    results.forEach((result) => {
        
        tmp[result.id] = result.doc.data;
        //feedback.push(tmp)
        //console.log(result);
    });

    const payload = {
        version: `6.5.2-an`,
        created: new Date(),
        files: tmp,
      }

    return payload
}



