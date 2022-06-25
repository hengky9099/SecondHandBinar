import {setLoading} from '../../../redux/globalAction';

// Edit Profile
export const editProfile = values => async dispatch => {
  dispatch(setLoading(true));
  try {
    const body = {
      full_name: values.name,
      phone_number: values.handphone,
      address: values.alamat,
      //   image:
    };
  } catch (error) {
    console.log(error);
  }
};

export const setProfile = payload => {
  return {
    type: 'SET_PROFILE',
    payload,
  };
};
