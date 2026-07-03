import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  addAddress,
  deleteAddress,
  setSelectedAddress,
} from "@/redux/productSlice";
import { Separator } from "@/components/ui/separator";

const AddressForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    email2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const { cart, addresses, selectedAddress } = useSelector(
    (store) => store.product,
  );
  const [showForm, setShowForm] = useState(
    addresses?.length > 0 ? false : true,
  );
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    dispatch(addAddress(formData));
    setShowForm(false);
  };

  const subtotal =
    cart?.items?.reduce((acc, item) => acc + item.price * item.quantity, 0) ||
    0;

  const tax = Math.round(subtotal * 0.05);

  const shipping = subtotal >= 300 || subtotal === 0 ? 0 : 50;

  const total = subtotal + shipping + tax;

  return (
    <div className="max-w-7xl mx-auto grid place-items-center p-10">
      <div className="grid grid-cols-2 items-start gap-20 mt-10 max-w-7xl mx-auto">
        <div className="space-y-4 p-6 bg-white">
          {showForm ? (
            <>
              <div>
                <label htmlFor="fullName">Full Name</label>
                <Input
                  id="fullName"
                  name="fullName"
                  required
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="phone">Phone Number</label>
                <Input
                  id="phone"
                  name="phone"
                  required
                  placeholder=""
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <Input
                  id="email"
                  name="email"
                  required
                  placeholder="joe@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="fullName">Address</label>
                <Input
                  id="address"
                  name="address"
                  required
                  placeholder=""
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div>
                    <label htmlFor="city">City</label>
                    <Input
                      id="city"
                      name="city"
                      required
                      placeholder=""
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="state">State</label>
                    <Input
                      id="state"
                      name="state"
                      required
                      placeholder=""
                      value={formData.state}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div>
                      <label htmlFor="zip">Zip Code</label>
                      <Input
                        id="zip"
                        name="zip"
                        required
                        placeholder=""
                        value={formData.zip}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="country">Country</label>
                      <Input
                        id="country"
                        name="country"
                        required
                        placeholder=""
                        value={formData.country}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={handleSave} className="w-full">
                Save & Continue
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Saved Addresses</h2>
                {addresses.map((addr, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => dispatch(setSelectedAddress(index))}
                      className={`border p-4 rounded-md cursor-pointer relative ${selectedAddress === index ? "border-pink-600 bg-pink-50" : "border-gray-300"}`}
                    >
                      <p className="font-medium">{addr.fullName}</p>
                      <p>{addr.phone}</p>
                      <p>{addr.email}</p>
                      <p>
                        {addr.address}, {addr.city}, {addr.state}, {addr.zip},{" "}
                        {addr.country}
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(deleteAddress(index));
                        }}
                        className="absolute right-2 top-2 text-red-400 hover:text-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  );
                })}

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowForm(true)}
                >
                  + Add New Address
                </Button>

                <Button
                  disabled={selectedAddress === null}
                  className="w-full bg-pink-700"
                >
                  Proceed To Checkout
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Right side order summary */}
        <div>
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal ({cart?.items?.length}) items</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (5%)</span>
                <span>₹{tax}</span>
              </div>

              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>₹{total}</span>
              </div>

              <div className="text-sm text-muted-foreground pt-4"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddressForm;
