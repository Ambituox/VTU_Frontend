export default function DataPlans() {
    const dataplans = {
      mtn: [
        { planSize: "25.0MB", smartUser: "₦13.0", validity: "30 days" },
        { planSize: "20.0MB", smartUser: "₦15.0", validity: "30 days" },
        { planSize: "50.0MB", smartUser: "₦25.0", validity: "30 days corporate gifting" },
        { planSize: "100.0MB", smartUser: "₦30.0", validity: "30 days" },
        { planSize: "50.0MB", smartUser: "₦46.0", validity: "30 days" },
        { planSize: "40.0MB", smartUser: "₦49.0", validity: "1 day" },
        { planSize: "150.0MB", smartUser: "₦50.0", validity: "30 days" },
        { planSize: "150.0MB", smartUser: "₦60.0", validity: "30 days corporate gifting" },
        { planSize: "250.0MB", smartUser: "₦69.7", validity: "30 days" },
        { planSize: "250.0MB", smartUser: "₦70.0", validity: "30 days corporate gifting" },
        { planSize: "100.0MB", smartUser: "₦95.0", validity: "1 Day" },
        { planSize: "500.0MB", smartUser: "₦122.5", validity: "30 days" },
        { planSize: "500.0MB", smartUser: "₦129.0", validity: "30 days" },
        { planSize: "750.0MB", smartUser: "₦135.0", validity: "30 days" },
        { planSize: "500.0MB", smartUser: "₦138.5", validity: "30 days" },
        { planSize: "500.0MB", smartUser: "₦141.0", validity: "30 days corporate gifting" },
        { planSize: "500.0MB", smartUser: "₦160.0", validity: "30 days" },
        { planSize: "1.0GB", smartUser: "₦200.0", validity: "1 day" },
        { planSize: "1.0GB", smartUser: "₦200.0", validity: "1 day" },
        { planSize: "1.0GB", smartUser: "₦200.0", validity: "1 day" },
        { planSize: "200.0MB", smartUser: "₦209.0", validity: "3-days(direct)" },
        { planSize: "250.0MB", smartUser: "₦209.0", validity: "2-days(direct)" },
        { planSize: "1.0GB", smartUser: "₦240.0", validity: "30 days" },
        { planSize: "1.0GB", smartUser: "₦259.0", validity: "30 days" },
        { planSize: "1.0GB", smartUser: "₦277.0", validity: "30 days" },
        { planSize: "1.0GB", smartUser: "₦282.0", validity: "30 days (corporate gifting)" },
        { planSize: "350.0MB", smartUser: "₦285.0", validity: "7-day(direct)" },
        { planSize: "750.0MB", smartUser: "₦285.0", validity: "3-days(direct)" },
        { planSize: "1.0GB", smartUser: "₦290.0", validity: "30 days" },
        { planSize: "1.0GB", smartUser: "₦343.0", validity: "1 day" },
        { planSize: "1.5GB", smartUser: "₦392.0", validity: "7 days" },
        { planSize: "1.5GB", smartUser: "₦408.0", validity: "30 days" },
        { planSize: "750.0MB", smartUser: "₦470.0", validity: "7 days(direct)" },
        { planSize: "600.0MB", smartUser: "₦475.0", validity: "7 days" },
        { planSize: "2.0GB", smartUser: "₦480.0", validity: "30 days" }
      ]
    };
  
    return (
      <div>
        <h2>MTN Data Plans</h2>
        <table>
          <thead>
            <tr>
              <th>Plan Size</th>
              <th>Smart User</th>
              <th>Validity</th>
            </tr>
          </thead>
          <tbody>
            {dataplans.mtn.map((plan, index) => (
              <tr key={index}>
                <td>{plan.planSize}</td>
                <td>{plan.smartUser}</td>
                <td>{plan.validity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  