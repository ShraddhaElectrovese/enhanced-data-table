import { createSlice } from "@reduxjs/toolkit";

const dealerData = [
  { id: 1, code: "D11574", name: "Patel Electricals", region: "South", zone: "Bengaluru", state: "Telangana", distributor: "Sri Sai Electricals", scans: 2, openingPts: 2000, earnedPts: 700, redeemedPts: 0, lastRedemption: "03 Jun 2026", mode: "Paytm" },
  { id: 2, code: "D13881", name: "Naidu Agencies", region: "West", zone: "Gujarat", state: "Gujarat", distributor: "Voltking Agencies", scans: 2, openingPts: 7500, earnedPts: 1000, redeemedPts: 0, lastRedemption: "03 Jun 2026", mode: "Bank NEFT" },
  { id: 3, code: "D16732", name: "Sethi Power Solutions", region: "East", zone: "Kolkata", state: "West Bengal", distributor: "Voltking Agencies", scans: 3, openingPts: 3000, earnedPts: 1050, redeemedPts: 3750, lastRedemption: "—", mode: "—" },
  { id: 4, code: "D16068", name: "Iyer Solar & Power", region: "South", zone: "Hyderabad", state: "Telangana", distributor: "GreenVolt Traders", scans: 3, openingPts: 4250, earnedPts: 1050, redeemedPts: 2500, lastRedemption: "30 Jun 2026", mode: "Paytm" },
  { id: 5, code: "D15602", name: "Kulkarni Traders", region: "South", zone: "Bengaluru", state: "Kerala", distributor: "Metro Power Dist.", scans: 2, openingPts: 7000, earnedPts: 1250, redeemedPts: 0, lastRedemption: "—", mode: "—" },
  { id: 6, code: "D13033", name: "Bose Traders", region: "West", zone: "MP", state: "Madhya Pradesh", distributor: "Apex Distributors", scans: 4, openingPts: 0, earnedPts: 1550, redeemedPts: 750, lastRedemption: "—", mode: "—" },
  { id: 7, code: "D11526", name: "Rao Enterprises", region: "North", zone: "UP West", state: "Haryana", distributor: "GreenVolt Traders", scans: 3, openingPts: 2250, earnedPts: 1600, redeemedPts: 0, lastRedemption: "—", mode: "—" },
  { id: 8, code: "D14779", name: "Kapoor Electricals", region: "South", zone: "Chennai", state: "Tamil Nadu", distributor: "Apex Distributors", scans: 2, openingPts: 5250, earnedPts: 1750, redeemedPts: 0, lastRedemption: "—", mode: "—" },
  { id: 9, code: "D12345", name: "Sharma Electronics", region: "North", zone: "Delhi", state: "Delhi", distributor: "Sri Sai Electricals", scans: 3, openingPts: 4500, earnedPts: 900, redeemedPts: 500, lastRedemption: "15 May 2026", mode: "Bank NEFT" },
  { id: 10, code: "D13456", name: "Mehta Brothers", region: "West", zone: "Mumbai", state: "Maharashtra", distributor: "Voltking Agencies", scans: 2, openingPts: 6000, earnedPts: 1100, redeemedPts: 0, lastRedemption: "—", mode: "—" },
  { id: 11, code: "D14567", name: "Gupta Solar Tech", region: "North", zone: "Jaipur", state: "Rajasthan", distributor: "GreenVolt Traders", scans: 4, openingPts: 3200, earnedPts: 1800, redeemedPts: 1200, lastRedemption: "03 Jun 2026", mode: "Paytm" },
  { id: 12, code: "D15678", name: "Verma Power House", region: "East", zone: "Patna", state: "Bihar", distributor: "Metro Power Dist.", scans: 2, openingPts: 1500, earnedPts: 650, redeemedPts: 0, lastRedemption: "—", mode: "—" },
  { id: 13, code: "D16789", name: "Reddy Electric Co.", region: "South", zone: "Hyderabad", state: "Andhra Pradesh", distributor: "Apex Distributors", scans: 3, openingPts: 8000, earnedPts: 1350, redeemedPts: 2000, lastRedemption: "30 Jun 2026", mode: "Bank NEFT" },
  { id: 14, code: "D17890", name: "Joshi Instruments", region: "West", zone: "Pune", state: "Maharashtra", distributor: "Voltking Agencies", scans: 2, openingPts: 5500, earnedPts: 900, redeemedPts: 0, lastRedemption: "—", mode: "—" },
  { id: 15, code: "D18901", name: "Singh Trading Co.", region: "North", zone: "Chandigarh", state: "Punjab", distributor: "GreenVolt Traders", scans: 3, openingPts: 2800, earnedPts: 1200, redeemedPts: 800, lastRedemption: "15 May 2026", mode: "Paytm" },
  { id: 16, code: "D19012", name: "Das Enterprises", region: "East", zone: "Kolkata", state: "West Bengal", distributor: "Sri Sai Electricals", scans: 2, openingPts: 4100, earnedPts: 750, redeemedPts: 0, lastRedemption: "—", mode: "—" },
  { id: 17, code: "D20123", name: "Nair & Sons", region: "South", zone: "Kochi", state: "Kerala", distributor: "Metro Power Dist.", scans: 4, openingPts: 6200, earnedPts: 1900, redeemedPts: 1500, lastRedemption: "03 Jun 2026", mode: "Bank NEFT" },
  { id: 18, code: "D21234", name: "Pandey Electricals", region: "North", zone: "Lucknow", state: "UP East", distributor: "Apex Distributors", scans: 2, openingPts: 3500, earnedPts: 800, redeemedPts: 0, lastRedemption: "—", mode: "—" },
  { id: 19, code: "D22345", name: "Tiwari Solar Systems", region: "East", zone: "Ranchi", state: "Jharkhand", distributor: "GreenVolt Traders", scans: 3, openingPts: 1800, earnedPts: 1100, redeemedPts: 600, lastRedemption: "30 Jun 2026", mode: "Paytm" },
  { id: 20, code: "D23456", name: "Malhotra Agencies", region: "North", zone: "Delhi", state: "Delhi", distributor: "Voltking Agencies", scans: 2, openingPts: 7200, earnedPts: 950, redeemedPts: 0, lastRedemption: "—", mode: "—" },
  { id: 21, code: "D24567", name: "Iyengar Power Solutions", region: "South", zone: "Bengaluru", state: "Karnataka", distributor: "Sri Sai Electricals", scans: 3, openingPts: 4800, earnedPts: 1400, redeemedPts: 900, lastRedemption: "03 Jun 2026", mode: "Bank NEFT" },
  { id: 22, code: "D25678", name: "Chatterjee & Co.", region: "East", zone: "Guwahati", state: "Assam", distributor: "Metro Power Dist.", scans: 2, openingPts: 2100, earnedPts: 600, redeemedPts: 0, lastRedemption: "—", mode: "—" },
  { id: 23, code: "D26789", name: "Banerjee Electricals", region: "East", zone: "Kolkata", state: "West Bengal", distributor: "Apex Distributors", scans: 4, openingPts: 5800, earnedPts: 1700, redeemedPts: 1100, lastRedemption: "30 Jun 2026", mode: "Paytm" },
  { id: 24, code: "D27890", name: "Kamath Traders", region: "South", zone: "Mangalore", state: "Karnataka", distributor: "GreenVolt Traders", scans: 2, openingPts: 3300, earnedPts: 850, redeemedPts: 0, lastRedemption: "—", mode: "—" },
  { id: 25, code: "D28901", name: "Bhat & Associates", region: "South", zone: "Chennai", state: "Tamil Nadu", distributor: "Voltking Agencies", scans: 3, openingPts: 6700, earnedPts: 1250, redeemedPts: 750, lastRedemption: "15 May 2026", mode: "Bank NEFT" },
  { id: 26, code: "D29012", name: "Pillai Enterprises", region: "South", zone: "Trivandrum", state: "Kerala", distributor: "Sri Sai Electricals", scans: 2, openingPts: 4400, earnedPts: 950, redeemedPts: 0, lastRedemption: "—", mode: "—" },
  { id: 27, code: "D30123", name: "Kumar Electronics", region: "North", zone: "Agra", state: "UP West", distributor: "Metro Power Dist.", scans: 3, openingPts: 2600, earnedPts: 1150, redeemedPts: 400, lastRedemption: "03 Jun 2026", mode: "Paytm" },
  { id: 28, code: "D31234", name: "Shukla Power Tech", region: "North", zone: "Bhopal", state: "Madhya Pradesh", distributor: "Apex Distributors", scans: 2, openingPts: 5100, earnedPts: 700, redeemedPts: 0, lastRedemption: "—", mode: "—" },
  { id: 29, code: "D32345", name: "Menon Solar Systems", region: "South", zone: "Kochi", state: "Kerala", distributor: "GreenVolt Traders", scans: 4, openingPts: 3800, earnedPts: 1600, redeemedPts: 1300, lastRedemption: "30 Jun 2026", mode: "Bank NEFT" },
  { id: 30, code: "D33456", name: "Kulkarni & Co.", region: "South", zone: "Pune", state: "Maharashtra", distributor: "Voltking Agencies", scans: 2, openingPts: 6500, earnedPts: 1050, redeemedPts: 0, lastRedemption: "—", mode: "—" },
  { id: 31, code: "D34567", name: "Deshpande Agencies", region: "West", zone: "Pune", state: "Maharashtra", distributor: "Sri Sai Electricals", scans: 3, openingPts: 2900, earnedPts: 1300, redeemedPts: 700, lastRedemption: "15 May 2026", mode: "Paytm" },
  { id: 32, code: "D35678", name: "Patil Trading Co.", region: "West", zone: "Nagpur", state: "Maharashtra", distributor: "Metro Power Dist.", scans: 2, openingPts: 4700, earnedPts: 850, redeemedPts: 0, lastRedemption: "—", mode: "—" },
  { id: 33, code: "D36789", name: "Desai Electric Works", region: "West", zone: "Ahmedabad", state: "Gujarat", distributor: "Apex Distributors", scans: 3, openingPts: 5400, earnedPts: 1450, redeemedPts: 950, lastRedemption: "03 Jun 2026", mode: "Bank NEFT" },
  { id: 34, code: "D37890", name: "Joshi Power Systems", region: "North", zone: "Dehradun", state: "Uttarakhand", distributor: "GreenVolt Traders", scans: 2, openingPts: 1900, earnedPts: 750, redeemedPts: 0, lastRedemption: "—", mode: "—" },
  { id: 35, code: "D38901", name: "Thakur Enterprises", region: "North", zone: "Jaipur", state: "Rajasthan", distributor: "Voltking Agencies", scans: 4, openingPts: 7800, earnedPts: 2000, redeemedPts: 1600, lastRedemption: "30 Jun 2026", mode: "Paytm" },
  { id: 36, code: "D39012", name: "Mishra Electronics", region: "East", zone: "Varanasi", state: "UP East", distributor: "Sri Sai Electricals", scans: 2, openingPts: 3100, earnedPts: 650, redeemedPts: 0, lastRedemption: "—", mode: "—" },
  { id: 37, code: "D40123", name: "Rathore Solar Pvt.", region: "West", zone: "Rajkot", state: "Gujarat", distributor: "Metro Power Dist.", scans: 3, openingPts: 5900, earnedPts: 1500, redeemedPts: 1000, lastRedemption: "15 May 2026", mode: "Bank NEFT" },
  { id: 38, code: "D41234", name: "Chauhan Agencies", region: "North", zone: "Indore", state: "Madhya Pradesh", distributor: "Apex Distributors", scans: 2, openingPts: 4200, earnedPts: 900, redeemedPts: 0, lastRedemption: "—", mode: "—" },
  { id: 39, code: "D42345", name: "Yadav Power House", region: "East", zone: "Kanpur", state: "UP West", distributor: "GreenVolt Traders", scans: 3, openingPts: 2400, earnedPts: 1100, redeemedPts: 500, lastRedemption: "03 Jun 2026", mode: "Paytm" },
  { id: 40, code: "D43456", name: "Sinha Trading Co.", region: "East", zone: "Patna", state: "Bihar", distributor: "Voltking Agencies", scans: 2, openingPts: 3600, earnedPts: 800, redeemedPts: 0, lastRedemption: "—", mode: "—" },
  { id: 41, code: "D44567", name: "Ramanujam Electronics", region: "South", zone: "Chennai", state: "Tamil Nadu", distributor: "Sri Sai Electricals", scans: 4, openingPts: 6800, earnedPts: 1850, redeemedPts: 1250, lastRedemption: "30 Jun 2026", mode: "Bank NEFT" },
  { id: 42, code: "D45678", name: "Subramanian Solar", region: "South", zone: "Coimbatore", state: "Tamil Nadu", distributor: "Metro Power Dist.", scans: 2, openingPts: 4900, earnedPts: 1000, redeemedPts: 0, lastRedemption: "—", mode: "—" },
  { id: 43, code: "D46789", name: "Kulkarni Electric", region: "South", zone: "Hubli", state: "Karnataka", distributor: "Apex Distributors", scans: 3, openingPts: 5300, earnedPts: 1300, redeemedPts: 800, lastRedemption: "03 Jun 2026", mode: "Paytm" },
  { id: 44, code: "D47890", name: "Rao & Sons", region: "South", zone: "Vijayawada", state: "Andhra Pradesh", distributor: "GreenVolt Traders", scans: 2, openingPts: 3400, earnedPts: 750, redeemedPts: 0, lastRedemption: "—", mode: "—" },
  { id: 45, code: "D48901", name: "Prasad Agencies", region: "South", zone: "Visakhapatnam", state: "Andhra Pradesh", distributor: "Voltking Agencies", scans: 3, openingPts: 6100, earnedPts: 1400, redeemedPts: 900, lastRedemption: "15 May 2026", mode: "Bank NEFT" },
  { id: 46, code: "D49012", name: "Ghosh Trading Co.", region: "East", zone: "Siliguri", state: "West Bengal", distributor: "Sri Sai Electricals", scans: 2, openingPts: 2700, earnedPts: 650, redeemedPts: 0, lastRedemption: "—", mode: "—" },
  { id: 47, code: "D50123", name: "Sen Electronics", region: "East", zone: "Durgapur", state: "West Bengal", distributor: "Metro Power Dist.", scans: 4, openingPts: 4600, earnedPts: 1700, redeemedPts: 1400, lastRedemption: "30 Jun 2026", mode: "Paytm" },
  { id: 48, code: "D51234", name: "Bhatt Solar Systems", region: "South", zone: "Mysuru", state: "Karnataka", distributor: "Apex Distributors", scans: 2, openingPts: 5700, earnedPts: 900, redeemedPts: 0, lastRedemption: "—", mode: "—" },
  { id: 49, code: "D52345", name: "Naik Power Solutions", region: "South", zone: "Belgaum", state: "Karnataka", distributor: "GreenVolt Traders", scans: 3, openingPts: 3900, earnedPts: 1200, redeemedPts: 700, lastRedemption: "03 Jun 2026", mode: "Bank NEFT" },
  { id: 50, code: "D53456", name: "Hegde Agencies", region: "South", zone: "Mangalore", state: "Karnataka", distributor: "Voltking Agencies", scans: 2, openingPts: 2300, earnedPts: 800, redeemedPts: 0, lastRedemption: "—", mode: "—" },
  { id: 51, code: "D54567", name: "Kamat Enterprises", region: "South", zone: "Goa", state: "Goa", distributor: "Sri Sai Electricals", scans: 3, openingPts: 4500, earnedPts: 1100, redeemedPts: 600, lastRedemption: "15 May 2026", mode: "Paytm" },
  { id: 52, code: "D55678", name: "Gaitonde Trading", region: "West", zone: "Goa", state: "Goa", distributor: "Metro Power Dist.", scans: 2, openingPts: 3200, earnedPts: 700, redeemedPts: 0, lastRedemption: "—", mode: "—" },
  { id: 53, code: "D56789", name: "Borkar Solar Pvt.", region: "West", zone: "Mumbai", state: "Maharashtra", distributor: "Apex Distributors", scans: 4, openingPts: 7100, earnedPts: 1900, redeemedPts: 1500, lastRedemption: "30 Jun 2026", mode: "Bank NEFT" },
  { id: 54, code: "D57890", name: "Velankar Electric", region: "West", zone: "Kolhapur", state: "Maharashtra", distributor: "GreenVolt Traders", scans: 2, openingPts: 2500, earnedPts: 850, redeemedPts: 0, lastRedemption: "—", mode: "—" },
  { id: 55, code: "D58901", name: "Sathe Power Co.", region: "West", zone: "Solapur", state: "Maharashtra", distributor: "Voltking Agencies", scans: 3, openingPts: 4300, earnedPts: 1350, redeemedPts: 1000, lastRedemption: "03 Jun 2026", mode: "Paytm" },
  { id: 56, code: "D59012", name: "Kokate Electronics", region: "West", zone: "Nashik", state: "Maharashtra", distributor: "Sri Sai Electricals", scans: 2, openingPts: 3700, earnedPts: 950, redeemedPts: 0, lastRedemption: "—", mode: "—" },
  { id: 57, code: "D60123", name: "Gawande Agencies", region: "West", zone: "Aurangabad", state: "Maharashtra", distributor: "Metro Power Dist.", scans: 3, openingPts: 5600, earnedPts: 1200, redeemedPts: 800, lastRedemption: "15 May 2026", mode: "Bank NEFT" },
  { id: 58, code: "D61234", name: "Raut Trading Co.", region: "West", zone: "Nagpur", state: "Maharashtra", distributor: "Apex Distributors", scans: 2, openingPts: 2000, earnedPts: 700, redeemedPts: 0, lastRedemption: "—", mode: "—" },
];

const getClosingPts = (d) => d.openingPts + d.earnedPts - d.redeemedPts;

const dealerSlice = createSlice({
  name: "dealer",
  initialState: {
    allDealers: dealerData,
    searchTerm: "",
    sortBy: "id",
    sortOrder: "asc",
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSort: (state, action) => {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
    },
  },
});

export const { setSearchTerm, setSort } = dealerSlice.actions;

export const selectFilteredDealers = (state) => {
  const { allDealers, searchTerm } = state.dealer;
  if (!searchTerm) return allDealers;
  const term = searchTerm.toLowerCase();
  return allDealers.filter(
    (d) => d.name.toLowerCase().includes(term) || d.code.toLowerCase().includes(term)
  );
};

export const selectSortedDealers = (state) => {
  const filtered = selectFilteredDealers(state);
  const { sortBy, sortOrder } = state.dealer;
  return [...filtered].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    if (sortOrder === "asc") return aVal > bVal ? 1 : -1;
    return aVal < bVal ? 1 : -1;
  });
};

export const selectTotals = (state) => {
  const filtered = selectFilteredDealers(state);
  return filtered.reduce(
    (acc, d) => ({
      scans: acc.scans + d.scans,
      openingPts: acc.openingPts + d.openingPts,
      earnedPts: acc.earnedPts + d.earnedPts,
      redeemedPts: acc.redeemedPts + d.redeemedPts,
      closingPts: acc.closingPts + getClosingPts(d),
    }),
    { scans: 0, openingPts: 0, earnedPts: 0, redeemedPts: 0, closingPts: 0 }
  );
};

export default dealerSlice.reducer;
