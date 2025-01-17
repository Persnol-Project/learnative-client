import { useState, useEffect, useContext } from "react";
import { Context } from "../../context";
import InstructorRoutes from "../../component/routes/InstructorRoute";
import axios from "axios";
import {
  DollarOutlined,
  SettingOutlined,
  LoadingOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { currencyFormatter1 } from "../../utils/helpers";

const InstructorRevenue = () => {
  const [balance, setBalance] = useState({ pending: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    sendBalanceRequest();
  }, []);

  const sendBalanceRequest = async () => {
    const { data } = await axios.get("/api/instructor/balance");
    setBalance(data);
  };

  const handlePayoutSettings = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/instructor/payout-settings");
      window.location.href = data;
    } catch (err) {
      setLoading(false);
      console.log(err);
      alert("Unable to access payout settings. Try later.");
    }
  };

  return (
    <InstructorRoutes>
      <div className="container">
        <div className="row pt-2">
          <div className="col-md-8 offset-md-2 bg-light p-5">
            <h2>
              Revenue report{" "}
              <img
                src="/rupee.png"
                className="float-right"
                style={{ float: "right", height: "40px", width: "40px" }}
              />{" "}
            </h2>
            <small>
              You get paid directly from stripe to your bank account every 48
              hour
            </small>
            <hr />
            {/* {JSON.stringify(balance, null, 4)} */}
            <h4>
              Pending balance
              {balance.pending &&
                balance.pending.map((bp, i) => (
                  <span
                    key={i}
                    className="float-right"
                    style={{ float: "right" }}
                  >
                    {currencyFormatter1(bp)}
                  </span>
                ))}
            </h4>
            <small>For last 48 hours</small>
            <hr />
            <h4>
              Payouts{" "}
              {!loading ? (
                <SettingOutlined
                  className="float-right pointer"
                  onClick={handlePayoutSettings}
                  style={{ float: "right" }}
                />
              ) : (
                <SyncOutlined
                  spin
                  className="float-right pointer"
                  style={{ float: "right" }}
                />
              )}
            </h4>
            <small>
              Update your stripe account details or view previous payouts.
            </small>
          </div>
        </div>
      </div>
    </InstructorRoutes>
  );
};

export default InstructorRevenue;
