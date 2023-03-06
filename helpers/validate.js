
// validate VN-Phone
export const checkPhone = (value) => {
    let err = '';
    const regexPhone = new RegExp(/^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/im)
    const checkPhone = regexPhone.test(value)
    if (checkPhone) {
        err = undefined;
    } else {
        err = "Chỉ bao gồm số, không chứa chữ hoặc kí tự đặc biệt !";
    }
    return err;
}

// Check email
export const checkEmail = (value) => {
  let error
  const regex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  const check = regex.test(value)

  if (value) {
    if (check) {
      error = undefined
    } else {
      error = 'Không phải địa chỉ email'
    }
  } else {
    error = undefined
  }
  return error
}

// Validate VietNam-Name
export const checkVietNameseName = (value) => {
    let err= '';
    function removeAscent (str) {
      if (str === null || str === undefined) return str;
      str = str.toLowerCase();
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
      str = str.replace(/đ/g, "d");
      return str;
    }
      const regex = /^[A-Za-z ]+$/;
    if (regex.test(removeAscent(value))) {
        err = undefined;
    } else {
        err = 'Tên chỉ bao gồm chữ !'
    }
    return err;
  }

  // Check empty
export const requiredSelect = (value) => {
    let error
    if (value && value.length > 0) {
      error = undefined
    } else {
      error = 'Trường này không được để trống'
    }
    return error
  }