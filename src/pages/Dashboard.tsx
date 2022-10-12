import React from "react";

const Dashboard = () => {
  return (
    <div className="h-full bg-slate-300">
      <div className="pt-14 flex flex-wrap lg:flex-nowrap justify-center">
        <div className="bg-secondary-dark-bg h-44 rounded-xl w-11/12 p-8 pt-9 m-3">
          News
        </div>
      </div>
      <div className="flex justify-center my-2">
        <h1 className="text-2xl w-11/12">Welcome {`{Stefan}`}</h1>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-11/12">
          {[1, 2, 3, 4, 5, 6].map((recent, index) => {
            return (
              <div
                key={index}
                className="flex justify-center p-6 text-2xl bg-gray-100 border-2 border-gray-300 rounded-xl"
              >
                Recent {recent}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
