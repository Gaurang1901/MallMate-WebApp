import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from "@mui/material";

// Address type
export interface Address {
  AddressLine1: string;
  AddressLine2: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  phone?: string;
}

interface AddressDialogProps {
  open: boolean;
  onClose: () => void;
  onAdd: (address: Address) => void;
  initialBgMode: "dark" | "light";
}

export const AddressDialog: React.FC<AddressDialogProps> = ({
  open,
  onClose,
  onAdd,
}) => {
  const [newAddress, setNewAddress] = useState<Address>({
    AddressLine1: "",
    AddressLine2: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phone: "",
  });
  const handleAddAddress = () => {
    if (
      newAddress.AddressLine1.trim() &&
      newAddress.city.trim() &&
      newAddress.state.trim() &&
      newAddress.country.trim() &&
      newAddress.pincode.trim()
    ) {
      onAdd(newAddress);
      setNewAddress({
        AddressLine1: "",
        AddressLine2: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        phone: "",
      });
    }
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle sx={{ fontWeight: 700, pb: 0 }}>Add New Address</DialogTitle>
      <DialogContent
        sx={{
          borderRadius: 2,
          mt: 1,
          mb: 1,
          px: { xs: 1, sm: 3 },
          py: 2,
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{ mb: 2, fontWeight: 500, color: "text.secondary" }}
        >
          Please fill in the address details
        </Typography>
        <div className="flex flex-wrap gap-4">
          <div className="w-full sm:w-[48%]">
            <TextField
              label="Address Line 1"
              value={newAddress.AddressLine1}
              onChange={(e) =>
                setNewAddress({ ...newAddress, AddressLine1: e.target.value })
              }
              fullWidth
              required
              autoFocus
            />
          </div>
          <div className="w-full sm:w-[48%]">
            <TextField
              label="Address Line 2"
              value={newAddress.AddressLine2}
              onChange={(e) =>
                setNewAddress({ ...newAddress, AddressLine2: e.target.value })
              }
              fullWidth
            />
          </div>
          <div className="w-full sm:w-[48%]">
            <TextField
              label="City"
              value={newAddress.city}
              onChange={(e) =>
                setNewAddress({ ...newAddress, city: e.target.value })
              }
              fullWidth
              required
            />
          </div>
          <div className="w-full sm:w-[48%]">
            <TextField
              label="State"
              value={newAddress.state}
              onChange={(e) =>
                setNewAddress({ ...newAddress, state: e.target.value })
              }
              fullWidth
              required
            />
          </div>
          <div className="w-full sm:w-[48%]">
            <TextField
              label="Country"
              value={newAddress.country}
              onChange={(e) =>
                setNewAddress({ ...newAddress, country: e.target.value })
              }
              fullWidth
              required
            />
          </div>
          <div className="w-full sm:w-[48%]">
            <TextField
              label="Pincode"
              value={newAddress.pincode}
              onChange={(e) =>
                setNewAddress({ ...newAddress, pincode: e.target.value })
              }
              fullWidth
              required
            />
          </div>
          <div className="w-full">
            <TextField
              label="Phone (optional)"
              value={newAddress.phone}
              onChange={(e) =>
                setNewAddress({ ...newAddress, phone: e.target.value })
              }
              fullWidth
            />
          </div>
        </div>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, pt: 0 }}>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleAddAddress}
          variant="contained"
          color="primary"
          disabled={
            !(
              newAddress.AddressLine1 &&
              newAddress.city &&
              newAddress.state &&
              newAddress.country &&
              newAddress.pincode
            )
          }
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
