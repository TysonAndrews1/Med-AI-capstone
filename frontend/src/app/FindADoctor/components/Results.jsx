import GoogleMap from "./GoogleMap";

const Results = ({ doctors }) => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Sidebar Doctor List */}
      <div className="w-[420px] border-r overflow-y-auto p-6 bg-white">
        <h2 className="text-2xl font-semibold mb-6">Your Compatible Doctors</h2>

        {doctors.length > 0 ? (
          <div className="space-y-6">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="mb-6">
                <h3 className="text-lg font-bold">{doctor.name}</h3>
                <p>Specialty: {doctor.specialty}</p>
                <p>Gender: {doctor.gender}</p>
                <p>Location: {doctor.location} ({doctor.distance})</p>
                <p>Rating: {doctor.rating}</p>
                <p>Languages: {doctor.languages.join(", ")}</p>
                <p>Availability: {doctor.availability.join(", ")}</p>
                <p>Services: {doctor.serviceTypes.join(", ")}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No doctors match your criteria.</p>
        )}
      </div>

      {/* Map Section */}
      <div className="flex-1 h-full sticky top-0">
        <GoogleMap doctors={doctors} />
      </div>
    </div>
  );
};

export default Results;
