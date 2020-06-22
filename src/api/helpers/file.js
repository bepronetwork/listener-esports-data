import fs from 'fs';
import { IS_LOCAL_DEV, IS_TEST } from '../../config';

const FOLDER_NAME = 'test/outputs';

export const writeFile = ({functionName, content}) => {
    /* To output the information to confirm no information leaks happen passphrases and passwords */
    if(IS_LOCAL_DEV == "true" && IS_TEST == "true"){
        fs.writeFileSync(`${FOLDER_NAME}/${functionName}.json`, JSON.stringify(content));
    }else{
        // To not write in production
    }

}