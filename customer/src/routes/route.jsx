import AcCreated from "../screens/AcCreated";
import AdaptQues from "../screens/AdaptQues";
import GenQue from "../screens/GenQue";
import Home from "../screens/Home"
import KycOne from "../screens/KycOne";
import KycTwo from "../screens/KycTwo";
import PayOne from "../screens/PayOne";
import Success from "../screens/Success";
import BankPay from "../screens/bankPay";


const routes = [
  {
    path: "/",
    element: <KycOne />,
  },
  {
    path: "/kyctwo",
    element: <KycTwo/>,
  },
  {
    path: "/genque",
    element: <GenQue/>,
  },
  {
    path: "/adapt",
    element: <AdaptQues/>,
  },
  {
    path: "/accr",
    element: <AcCreated/>,
  },
  {
    path: "/payone",
    element: <PayOne/>,
  },
  {
    path: "/bankpay",
    element: <BankPay/>,
  },
  {
    path: "/success",
    element: <Success/>,
  },
  {
    path: "/home",
    element: <Home />,
  },
];
export default routes
