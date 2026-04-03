import { GET, PUT, POST, DELETE_REQ } from '../../utils/api';

export const loginUser = async (path , body) =>{
    const res = await POST(path, body);

    return res;
} 
    
export const registerUser = async (path , body ) =>{
    const res = await POST(path ,body);
    return res;
}
