/**
 * Created by charnjeetelectrovese@gmail.com on 9/13/2017.
 */
import axios from 'axios';
import Constants from '../config/constants';
import {getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceLoginUser(data) {
    return await postRequest('auth/login', data);
}
export async function serviceGetProfile () {
    return await postRequest('profile', {});
}

export async function serviceGetOrgChart() {
    return await getRequest('salesapp/org/chart', {}, );
}
export async function serviceGetList(list, otherParams = {}) {
    return await postRequest('list', { list: list, ...otherParams });
}
export async function serviceRequestOtp(params) {
    return await postRequest('auth/send/otp', params);
}
export async function serviceVerifyOTP(params) {
    return await postRequest('auth/verify/otp', params);
}

// export async function serviceGetStaffList(list, otherParams = {}) {
//     return await postRequest('admin/profile', { list: list, ...otherParams });
// }
export async function serviceGetUnitsList(list, otherParams = {}) {
    return await postRequest('list', { list: list, ...otherParams });
}
export async function serviceForgotPassword(params) {
    return await postRequest('auth/forgot/password', params);
}
export async function serviceGetTagList(params) {
    return await postRequest('keywords', params);
}
export async function serviceResetPassword(params) {
    return await postRequest('auth/reset/password', params);
}


export async function serviceResetProfilePassword(params) {
    return await postRequest('profile/reset/password', params);
}

export async function updateTemplates(data) {
    try {
        const tempRequest = await axios.post(`${Constants.DEFAULT_APP_URL}updatetemplates`, data);
        if (tempRequest.status === 200) {
            if (tempRequest.data.response_code === 1) {
                return true;
            }
        }
        return false;
    } catch (e) {
        return false;
    }
}
export async function fetchZones() {
    const tempRequest = await axios.get(`${Constants.DEFAULT_APP_URL}/getzones`);
    if (tempRequest.status === 200) {
        if (tempRequest.data.response_code === 1) {
            return tempRequest.data.response_obj;
        }
    }
}

export async function fetchPhotographers(page_id = 1, row = null, order = null) {
    const tempRequest = await axios.post(`${Constants.DEFAULT_APP_URL}photographers`, { page_id, row, order });
    if (tempRequest.status === 200) {
        if (tempRequest.data.response_code === 1) {
            return tempRequest.data.response_obj;
        }
    }
}

export async function suspendUser(userId, status) {
    const tempRequest = await axios.post(`${Constants.DEFAULT_APP_URL}suspenduser`, { user_id: userId, status });
    if (tempRequest.status === 200) {
        if (tempRequest.data.response_code === 1) {
            return tempRequest.data;
        }
    }
}
export async function fetchFilterUsers(value) {
    const tempRequest = await axios.post(`${Constants.DEFAULT_APP_URL}searchuser`, { query: value });
    if (tempRequest.status === 200) {
        if (tempRequest.data.response_code === 1) {
            return tempRequest.data.response_obj;
        }
    }
}

export async function fetchFilterPhotographers(value) {
    const tempRequest = await axios.post(`${Constants.DEFAULT_APP_URL}searchphotographer`, { query: value });
    if (tempRequest.status === 200) {
        if (tempRequest.data.response_code === 1) {
            return tempRequest.data.response_obj;
        }
    }
}
export async function serviceGetPlans(params) {
    return await postRequest('getplans', params);
}


export async function serviceAddPlan(params) {
    return await postRequest('addplan', params);
}

export async function serviceEditPlan(params) {
    return await postRequest('editplan', params);
}

export async function sendNotification(data) {
    try {
        const tempRequest = await axios.post(`${Constants.DEFAULT_APP_URL}sendnotification`, data);
        if (tempRequest.status === 200) {
            if (tempRequest.data.response_code === 1) {
                return true;
            }
        }
        return false;
    } catch (e) {
        return false;
    }
}
export async function serviceUpdatePoints(data) {
    try {
        const tempRequest = await axios.post(`${Constants.DEFAULT_APP_URL}updatepoints`, data);
        if (tempRequest.status === 200) {
            if (tempRequest.data.response_code === 1) {
                return true;
            }
        }
        return false;
    } catch (e) {
        return false;
    }
}



export async function fetchUser(user_id) {
    const tempRequest = await axios.post(`${Constants.DEFAULT_APP_URL}getuser`, { user_id });
    if (tempRequest.status === 200) {
        if (tempRequest.data.response_code === 1) {
            return tempRequest.data.response_obj;
        }
    }
}
export async function deletePost(post_id) {
    const tempRequest = await axios.post(`${Constants.DEFAULT_APP_URL}deletepost`, { post_id });
    if (tempRequest.status === 200) {
        if (tempRequest.data.response_code === 1) {
            return tempRequest.data.response_obj;
        }
    }
}

export async function fetchPayments(page_id = 1, row = null, order = null) {
    const tempRequest = await axios.post(`${Constants.DEFAULT_APP_URL}payments`, { page_id, row, order });
    if (tempRequest.status === 200) {
        if (tempRequest.data.response_code === 1) {
            return tempRequest.data.response_obj;
        }
    }
}

export async function serviceFirstLoginResetPassword(params) {
    return await postRequest('auth/reset/password', params);
}
