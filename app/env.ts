const env = {
    appwrite:{
        endpoint:String(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT),
        projectId:String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID),
        apiKey:String(process.env.NEXT_PUBLIC_APPWRITE_API_KEY)
    }
}
console.log("env.ts file appwrite credentials - endpoint", env.appwrite.endpoint );
console.log("env.ts file appwrite credentials - projectId", env.appwrite.projectId );
console.log("env.ts file appwrite credentials - apiKey", env.appwrite.apiKey );


export default env;