import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";
import { clearCredentials, setCredentials } from "./authSlice";

export const signin = createAsyncThunk(
  "user/signin",
  async (user, { dispatch, getState, rejectWithValue }) => {
    axios.defaults.withCredentials = true;

    try {
      const { data } = await axios.post(
        "https://ecommerce-project-backend-w8gg.onrender.com/api/users/auth",
        user
      );

      dispatch(setCredentials(data));
      toast.success("Logged In");
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

export const signUp = createAsyncThunk(
  "user/signup",
  async ({ user, navigate }) => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.post(
        "https://ecommerce-project-backend-w8gg.onrender.com/api/users",
        user
      );
      navigate("/signin");
      toast.success("Account created Successfully");
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);

export const logout = createAsyncThunk("user/logout", async (navigate) => {
  axios.defaults.withCredentials = true;
  try {
    const { data } = await axios.post(
      "https://ecommerce-project-backend-w8gg.onrender.com/api/users/logout"
    );
    navigate("/");
    return data;
  } catch (error) {
    throw new Error(error);
  }
});

export const updateUser = createAsyncThunk(
  "user/update",
  async (user, { dispatch }) => {
    axios.defaults.withCredentials = true;
    try {
      const { data } = await axios.put(
        "https://ecommerce-project-backend-w8gg.onrender.com/api/users",
        user
      );
      toast.success("User Updated");
      dispatch(setCredentials(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
);
export const getUser = createAsyncThunk("user/getUser", async (id) => {
  axios.defaults.withCredentials = true;
  try {
    const { data } = await axios.get(
      "https://ecommerce-project-backend-w8gg.onrender.com/api/users",
      id
    );
    dispatch(setCredentials(data));
    return data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});
export const getAllUsers = createAsyncThunk("user/getAllUsers", async () => {
  axios.defaults.withCredentials = true;
  try {
    const { data } = await axios.get(
      "https://ecommerce-project-backend-w8gg.onrender.com/api/users"
    );

    return data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(signin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      state.loading = false;
      state.loggedInUser = action.payload;
    });
    builder.addCase(signin.rejected, (state) => {
      state.loading = false;
    });
    ///////////////////////////////////////////////////////////////
    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.loading = false;
      state.createdUser = action.payload;
    });
    builder.addCase(signUp.rejected, (state) => {
      state.loading = false;
    });
    //////////////////////////////////////////////////////////
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.loading = false;
      state.logoutedUser = action.payload;
    });
    builder.addCase(logout.rejected, (state) => {
      state.loading = false;
    });
    ///////////////////////////////////////////////////////////////////
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.updatedUser = action.payload;
    });
    builder.addCase(updateUser.rejected, (state) => {
      state.loading = false;
    });
    ///////////////////////////////////////////////////////////////////
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.gettedUser = action.payload;
    });
    builder.addCase(getUser.rejected, (state) => {
      state.loading = false;
    });
    ///////////////////////////////////////////////////////////////////
    builder.addCase(getAllUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.allUsers = action.payload;
    });
    builder.addCase(getAllUsers.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
