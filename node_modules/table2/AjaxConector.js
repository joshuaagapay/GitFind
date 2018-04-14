import axios from 'axios';

const AjaxClass = () => {
    const request = function request(opt, cb) {
        axios(opt)
          .then((response) => {
              cb(response.data);
          });
    };
    return {
        request,
    };
};

export default new AjaxClass();
