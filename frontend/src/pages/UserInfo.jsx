import { ArrowLeft, Camera, User } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import userlogo from "@/assets/userlogo.png";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../api/axios"
import { toast } from "sonner";
import { setUser } from "@/redux/userSlice";

const UserInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [updateUser, setUpdateUser] = useState({
    firstName: "", lastName: "", email: "",
    address: "", city: "", zipCode: "",
    phoneno: "", role: "", profilePic: "",
  });
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const { user } = useSelector((store) => store.user);
  const params = useParams();
  const userId = params.id;

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
      formData.append("address", updateUser.address ?? "");
      formData.append("city", updateUser.city ?? "");
      formData.append("zipCode", updateUser.zipCode ?? "");
      formData.append("phoneno", updateUser.phoneno ?? "");
      if (updateUser.role) formData.append("role", updateUser.role);
      if (file) formData.append("file", file);

      const res = await api.put(
        `/user/update/${userId}`,
        formData,
        { headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "multipart/form-data" } }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
        getUserDetails();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await api.get(`/user/get-user/${userId}`);
      if (res.data.success) {
        const u = res.data.user;
        setUpdateUser({
          firstName: u.firstName || "", lastName: u.lastName || "",
          email: u.email || "", address: u.address?.street || "",
          city: u.address?.city || "", zipCode: u.address?.pincode || "",
          phoneno: u.address?.phoneno || "", role: u.role || "",
          profilePic: u.profilePic || "",
        });
      }
    } catch (error) { console.log(error); }
  };

  useEffect(() => { getUserDetails(); }, []);

  const inputClass = "w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 outline-none transition duration-200 placeholder-gray-300 text-gray-800";
  const labelClass = "text-[12px] font-bold uppercase tracking-wider text-gray-400 mb-1 block";

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">

        {/* Back button + header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-xl border border-gray-200 bg-white hover:border-pink-300 hover:bg-pink-50 flex items-center justify-center transition duration-200 shadow-sm"
          >
            <ArrowLeft size={16} className="text-gray-600" />
          </button>
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-pink-500 bg-pink-50 border border-pink-100 px-3 py-1 rounded-full">
              My Account
            </span>
            <h1 className="text-2xl font-extrabold text-gray-900 mt-2">Update Profile</h1>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 items-start">

          {/* ── Profile Picture Card ── */}
          <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 flex flex-col items-center gap-4 w-full sm:w-48 shrink-0">
            <div className="relative">
              <img
                src={updateUser?.profilePic || userlogo}
                alt="profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-pink-100 shadow-md"
              />
              {/* Camera overlay */}
              <label
                htmlFor="file-upload"
                className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-pink-600 hover:bg-pink-700 flex items-center justify-center cursor-pointer shadow-md transition duration-200"
              >
                <Camera size={14} className="text-white" />
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            <div className="text-center">
              <p className="text-[14px] font-bold text-gray-800 leading-none">
                {updateUser.firstName || "Your"} {updateUser.lastName || "Name"}
              </p>
              <p className="text-[11px] text-gray-400 mt-1 capitalize">{updateUser.role || "user"}</p>
            </div>

            {/* Role badge */}
            <span className={`text-[11px] font-bold px-3 py-1 rounded-full border
              ${updateUser.role === "admin"
                ? "bg-violet-50 text-violet-600 border-violet-200"
                : "bg-pink-50 text-pink-600 border-pink-200"}`}>
              {updateUser.role || "user"}
            </span>
          </div>

          {/* ── Form Card ── */}
          <div className="flex-1 bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>First Name</label>
                  <input type="text" name="firstName" value={updateUser.firstName} onChange={handleChange} className={inputClass} placeholder="John" />
                </div>
                <div>
                  <label className={labelClass}>Last Name</label>
                  <input type="text" name="lastName" value={updateUser.lastName} onChange={handleChange} className={inputClass} placeholder="Doe" />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className={labelClass}>Email Address</label>
                <input type="email" name="email" value={updateUser.email} onChange={handleChange} className={inputClass} placeholder="you@example.com" />
              </div>

              {/* Phone */}
              <div>
                <label className={labelClass}>Phone Number</label>
                <input type="text" name="phoneno" value={updateUser.phoneno} onChange={handleChange} className={inputClass} placeholder="+91 00000 00000" />
              </div>

              {/* Address */}
              <div>
                <label className={labelClass}>Street Address</label>
                <input type="text" name="address" value={updateUser.address} onChange={handleChange} className={inputClass} placeholder="123 Main Street" />
              </div>

              {/* City + Zip */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>City</label>
                  <input type="text" name="city" value={updateUser.city} onChange={handleChange} className={inputClass} placeholder="Mumbai" />
                </div>
                <div>
                  <label className={labelClass}>Zip Code</label>
                  <input type="text" name="zipCode" value={updateUser.zipCode} onChange={handleChange} className={inputClass} placeholder="400001" />
                </div>
              </div>

              {/* Role */}
              <div>
                <label className={labelClass}>Role</label>
                <div className="flex gap-3 mt-1">
                  {["user", "admin"].map((r) => (
                    <label
                      key={r}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl border cursor-pointer text-sm font-semibold transition duration-150
                        ${updateUser.role === r
                          ? r === "admin"
                            ? "bg-violet-50 border-violet-300 text-violet-700"
                            : "bg-pink-50 border-pink-300 text-pink-700"
                          : "border-gray-200 text-gray-500 hover:bg-gray-50"}`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={r}
                        checked={updateUser.role === r}
                        onChange={() => setUpdateUser({ ...updateUser, role: r })}
                        className="accent-pink-500 w-3.5 h-3.5"
                      />
                      {r.charAt(0).toUpperCase() + r.slice(1)}
                    </label>
                  ))}
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
      </div>
    </div>
  );
};

export default UserInfo;