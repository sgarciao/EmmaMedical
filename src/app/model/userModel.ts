import { userDetailModel } from './userDetailModel';

export class userModel{
    
    user_id:            string;
    name:               string;
    middlename:         string;
    lastname:           string;
    company_id:         number;
    company_branch_id:  number;
    customer_id:        number;
    customer_branch_id: number;
    position:           string;
    tax_reference:      string;
    phone:              string;
    phone_2:            string;
    cellphone:          string;
    status:             string;
    creation_date:      string;
    creation_time:      string;
    
    users_data:{};
}