import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "@/redux/userSlice";
import userlogo from "@/assets/userlogo.png";
import { Camera, User } from "lucide-react";

const inputClass = "w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none transition duration-200 placeholder-gray-300 text-gray-800 bg-white";
const labelClass = "text-[12px] font-bold uppercase tracking-wider text-gray-400 mb-1 block";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.user);
  const params = useParams();
  const userId = params.userId;

  const [updateUser, setUpdateUser] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    address: user?.address?.street || "",
    city: user?.address?.city || "",
    zipCode: user?.address?.pincode || "",
    phoneno: user?.address?.phoneno || "",
    profilePic: user?.profilePic || "",
  });

  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setUpdateUser({ ...updateUser, profilePic: URL.createObjectURL(selectedFile) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const accessToken = localStorage.getItem("accessToken");
    try {
      const formData = new FormData();
      formData.append("firstName", updateUser.firstName ?? "");
      formData.append("lastName", updateUser.lastName ?? "");
      formData.append("email", updateUser.email ?? "");
      formData.append("phoneno", updateUser.phoneno ?? "");
      formData.append("address", updateUser.address ?? "");
      formData.append("city", updateUser.city ?? "");
      formData.append("zipCode", updateUser.zipCode ?? "");
      if (updateUser.role) formData.append("role", updateUser.role);
      if (file) formData.append("file", file);

      const res = await axios.put(
        `http://localhost:8000/api/v1/user/update/${userId}`,
        formData,
        { headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "multipart/form-data" } }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-16 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Page Header */}
        <div className="mb-8 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-pink-500 bg-pink-50 border border-pink-100 px-3 py-1 rounded-full">
            My Account
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-3">
            My Profile
          </h1>
        </div>

        <Tabs defaultValue="profile">
          <TabsList className="w-full bg-white border border-gray-100 rounded-xl p-1 shadow-sm mb-6">
            <TabsTrigger
              value="profile"
              className="flex-1 rounded-lg text-sm font-semibold data-[state=active]:bg-pink-600 data-[state=active]:text-white data-[state=active]:shadow-sm transition duration-200"
            >
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="flex flex-col sm:flex-row gap-6 items-start">

              {/* ── Avatar Card ── */}
              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex flex-col items-center gap-4 w-full sm:w-48 shrink-0">
                <div className="relative">
                  <img
                    src={updateUser?.profilePic || userlogo}
                    alt="profile"
                    className="w-28 h-28 rounded-full object-cover border-4 border-pink-100 shadow-md"
                  />
                  <label
                    htmlFor="profile-pic-upload"
                    className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-pink-600 hover:bg-pink-700 flex items-center justify-center cursor-pointer shadow-md transition duration-200"
                  >
                    <Camera size={14} className="text-white" />
                    <input
                      id="profile-pic-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>

                {/* Live name preview */}
                <div className="text-center">
                  <p className="text-[14px] font-bold text-gray-800 leading-none">
                    {updateUser.firstName || "Your"} {updateUser.lastName || "Name"}
                  </p>
                  <p className="text-[11px] text-gray-400 mt-1 truncate max-w-[120px]">
                    {updateUser.email || "email@example.com"}
                  </p>
                </div>

                <span className="text-[11px] font-bold px-3 py-1 rounded-full border bg-pink-50 text-pink-500 border-pink-200">
                  {user?.role || "user"}
                </span>
              </div>

              {/* ── Form Card ── */}
              <div className="flex-1 bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
                <form onSubmit={handleSubmit} className="space-y-4">

                  {/* Name */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>First Name</label>
                      <input type="text" name="firstName" value={updateUser.firstName || ""} onChange={handleChange} className={inputClass} placeholder="John" />
                    </div>
                    <div>
                      <label className={labelClass}>Last Name</label>
                      <input type="text" name="lastName" value={updateUser.lastName || ""} onChange={handleChange} className={inputClass} placeholder="Doe" />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className={labelClass}>Email Address</label>
                    <input type="email" name="email" value={updateUser.email || ""} onChange={handleChange} className={inputClass} placeholder="you@example.com" />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className={labelClass}>Phone Number</label>
                    <input type="text" name="phoneno" value={updateUser.phoneno || ""} onChange={handleChange} className={inputClass} placeholder="+91 00000 00000" />
                  </div>

                  {/* Address */}
                  <div>
                    <label className={labelClass}>Street Address</label>
                    <input type="text" name="address" value={updateUser.address || ""} onChange={handleChange} className={inputClass} placeholder="123 Main Street" />
                  </div>

                  {/* City + Zip */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>City</label>
                      <input type="text" name="city" value={updateUser.city || ""} onChange={handleChange} className={inputClass} placeholder="Mumbai" />
                    </div>
                    <div>
                      <label className={labelClass}>Zip Code</label>
                      <input type="text" name="zipCode" value={updateUser.zipCode || ""} onChange={handleChange} className={inputClass} placeholder="400001" />
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 bg-pink-600 hover:bg-pink-700 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition duration-200 shadow-sm hover:shadow-md text-[15px] flex items-center justify-center gap-2"
                  >
                    {loading && (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    )}
                    {loading ? "Saving changes..." : "Save Changes"}
                  </button>
                </form>
              </div>

            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;