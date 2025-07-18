import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { removeFromCart, clearCart, CartItem } from '../store/cart.slice';
import { Box, Typography, Button, TextField, Divider, useTheme, Paper, MenuItem } from '@mui/material';
import { AddressDialog, Address } from './AddressDialog';

const CartPage: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state?.cart?.items || []);
  // Address state
  const [addresses, setAddresses] = useState<Address[]>([
    {
      AddressLine1: "123 Main St",
      AddressLine2: "Apt 4B",
      city: "Metropolis",
      state: "NY",
      country: "USA",
      pincode: "10001",
      phone: "1234567890",
    },
  ]);
  const [address, setAddress] = useState<string>("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [discount, setDiscount] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountError, setDiscountError] = useState('');

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountedTotal = discountApplied ? total * 0.9 : total;

  const handleApplyDiscount = () => {
    if (discount.trim().toLowerCase() === 'mallmate10') {
      setDiscountApplied(true);
      setDiscountError('');
    } else {
      setDiscountError('Invalid discount code');
      setDiscountApplied(false);
    }
  };

  function formatAddress(addr: Address) {
    return `${addr.AddressLine1}, ${addr.AddressLine2 ? addr.AddressLine2 + ', ' : ''}${addr.city}, ${addr.state}, ${addr.country} - ${addr.pincode}${addr.phone ? ' (' + addr.phone + ')' : ''}`;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: theme.palette.background.default,
        py: { xs: 2, md: 6 },
        px: { xs: 1, md: 4 },
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 4,
      }}
    >
      {/* Cart Items */}
      <Paper
        elevation={3}
        sx={{
          flex: 2,
          p: 3,
          mb: { xs: 3, md: 0 },
          bgcolor: theme.palette.background.paper,
          borderRadius: 3,
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
          Cart Items
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {cartItems.length === 0 ? (
          <Typography color="text.secondary">Your cart is empty.</Typography>
        ) : (
          cartItems.map((item: CartItem) => (
            <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
              <img src={item.image} alt={item.name} style={{ width: 64, height: 64, borderRadius: 8, objectFit: 'cover', background: theme.palette.grey[100] }} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1" sx={{ color: 'text.primary', fontWeight: 600 }}>{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">Qty: {item.quantity}</Typography>
                <Typography variant="body2" color="text.secondary">${item.price.toFixed(2)} each</Typography>
              </Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'primary.main', minWidth: 80, textAlign: 'right' }}>
                ${(item.price * item.quantity).toFixed(2)}
              </Typography>
              <Button color="error" onClick={() => dispatch(removeFromCart(item.id))}>Remove</Button>
            </Box>
          ))
        )}
        {cartItems.length > 0 && (
          <Button color="error" onClick={() => dispatch(clearCart())} sx={{ mt: 2 }}>
            Clear Cart
          </Button>
        )}
      </Paper>

      {/* Order Details */}
      <Paper
        elevation={3}
        sx={{
          flex: 1,
          p: 3,
          bgcolor: theme.palette.background.paper,
          borderRadius: 3,
          minWidth: { md: 320 },
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
          Order Details
        </Typography>
        <Divider sx={{ mb: 2 }} />
        {/* Address Dropdown and Add Button */}
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <TextField
            select
            label="Shipping Address"
            value={address}
            onChange={e => setAddress(e.target.value)}
            fullWidth
          >
            {addresses.map((addr, idx) => (
              <MenuItem key={idx} value={formatAddress(addr)}>{formatAddress(addr)}</MenuItem>
            ))}
          </TextField>
          <Button variant="outlined" onClick={() => setAddDialogOpen(true)} sx={{ minWidth: 0, px: 2 }}>
            Add
          </Button>
        </Box>
        <AddressDialog
          open={addDialogOpen}
          onClose={() => setAddDialogOpen(false)}
          onAdd={addr => {
            setAddresses([...addresses, addr]);
            setAddress(formatAddress(addr));
            setAddDialogOpen(false);
          }}
          initialBgMode={theme.palette.mode === 'dark' ? 'dark' : 'light'}
        />
        <TextField
          label="Discount Code"
          value={discount}
          onChange={e => setDiscount(e.target.value)}
          fullWidth
          sx={{ mb: 1 }}
          error={!!discountError}
          helperText={discountError || (discountApplied ? 'Discount applied!' : '')}
        />
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ mb: 2 }}
          onClick={handleApplyDiscount}
          disabled={discountApplied}
        >
          Apply Discount
        </Button>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography color="text.secondary">Subtotal</Typography>
          <Typography>${total.toFixed(2)}</Typography>
        </Box>
        {discountApplied && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography color="text.secondary">Discount (10%)</Typography>
            <Typography color="success.main">- ${(total * 0.1).toFixed(2)}</Typography>
          </Box>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography fontWeight={700}>Total</Typography>
          <Typography fontWeight={700} color="primary.main">${discountedTotal.toFixed(2)}</Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          disabled={!address || cartItems.length === 0}
        >
          Place Order
        </Button>
      </Paper>
    </Box>
  );
};

export default CartPage; 