import { CloudSyncOutlined } from "@ant-design/icons";

import UserRoutes from "../../component/routes/UserRoutes";

const StripeCancel = () => {
  return (
    <UserRoutes showNav={false}>
      <div className="row text-center">
        <div className="col-md-9">
          <CloudSyncOutlined className="display-1 text-danger p-5" />
          <p className="lead">❌ Payment failed... Please try again...</p>
        </div>
        <div className="col-md-3"></div>
      </div>
    </UserRoutes>
  );
};
export default StripeCancel;
