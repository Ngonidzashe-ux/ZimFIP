import { useNavigate } from "react-router-dom";

function Upgrade() {
  const navigate = useNavigate();
  const plans = [
    {
      name: "Free",
      quota: "Limited Usage",
      features: ["Basic Access", "Marketplace"],
      cta: "Current Plan",
      disabled: true,
    },
    {
      name: "SuperGrok",
      quota: "Higher Quota",
      features: ["Voice Mode", "DeepSearch", "Priority Support"],
      cta: "Upgrade Now",
      popular: true,
    },
    {
      name: "Premium",
      quota: "Unlimited",
      features: ["All Features", "Custom AI"],
      cta: "Coming Soon",
      disabled: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4">
      <div className="[mask-image:radial-gradient(circle_at_top,#000000_0,transparent_80%,transparent_100%)] absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          src="https://cdn.pixabay.com/video/2021/08/07/84226-586657520_large.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto pt-20">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Upgrade Your Experience
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
              {plan.popular && (
                <span className="bg-teal-300 text-gray-900 px-2 py-1 rounded text-sm">
                  Most Popular
                </span>
              )}
              <p className="text-gray-300 mb-4">{plan.quota}</p>
              <ul className="text-gray-400 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="mb-2">
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => !plan.disabled && navigate("/checkout")}
                className={`w-full py-2 rounded ${
                  plan.disabled
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-teal-300 hover:bg-teal-400"
                } text-white`}
                disabled={plan.disabled}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Upgrade;
