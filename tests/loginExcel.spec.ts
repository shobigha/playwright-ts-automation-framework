import {test, expect} from '../fixtures/myfixtures';
import * as XLSX from 'xlsx';
import path from 'path';

type LoginScenarios={
    name:string;
    username:string;
    password: string;
    expected: string;
}

const workbook=XLSX.readFile(path.join(__dirname, '../test-data/loginScenarios.xlsx'));
const sheet=workbook.Sheets['LoginScenarios'];
const scenarios=XLSX.utils.sheet_to_json<LoginScenarios>(sheet, {defval: ''});

for (const data of scenarios){
    test(`Login fail :${data.name}`, async({login})=>{
        await login.goto();
        await login.login(data.username.toString(), data.password.toString());
        await expect(login.errorMessage).toContainText(data.expected.toString());



    })
}
