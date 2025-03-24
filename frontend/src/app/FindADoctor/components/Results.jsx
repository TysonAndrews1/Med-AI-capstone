import GoogleMap from "./GoogleMap";

const Results = ({ doctors, userLocation, userAddress}) => {
  return (
    <div className="flex justify-center h-screen w-full overflow-hidden ">

      {/* Sidebar Doctor Results */}
      <div className="w-[600px] overflow-y-auto p-6">

        {/* The user's location + Modify search */}
        <div className="space-y-6"> 
            <div className="border border-gray-300 bg-white p-4 rounded-lg mb-6">
                <div className="mb-4">
                    <p>Showing results near: <span className="font-semibold">{userAddress}</span></p>
                </div>
                <button className="w-full bg-[#1B4D3E] text-white py-2 rounded">
                Modify your Search
                </button>
            </div>
            
        </div>

        {doctors.length > 0 ? (
          <div className="space-y-6">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="border border-gray-300 bg-white p-4 rounded-lg mb-6">
                <h3 className="text-lg text-left font-bold ">{doctor.name}</h3>
                <p className="text-left">Specialty: {doctor.specialty}</p>
                <p className="text-left">Gender: {doctor.gender}</p>
                <p className="text-left">
                  Location: {doctor.location} ({doctor.distance})
                </p>
                <p className="text-left">Rating: {doctor.rating}</p>
                <p className="text-left">Languages: {doctor.languages.join(", ")}</p>
                <p className="text-left">Availability: {doctor.availability.join(", ")}</p>
                <p className="text-left">Services: {doctor.serviceTypes.join(", ")}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No doctors match your criteria.</p>
        )}
      </div>

      {/* Map Section */}
      <div className="w-[500px] h-[450px] p-4">
        <div className="w-full h-full rounded-lg overflow-hidden shadow">
          <GoogleMap doctors={doctors} userLocation={userLocation}/>
        </div>
      </div>
    </div>
  );
};

export default Results;
