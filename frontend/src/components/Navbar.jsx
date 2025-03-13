"use client"
import { usePathname,useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();  // Get the router instance
  const pathname = usePathname()
  

  const navItems = [
    { title: 'MedHealth Bot', icon: '', path: '/' },
    { title: 'Test Results Analysis', icon: '', path: '/TestAnalysis' },
    { title: 'Medication Assistance', icon: '', path: '/MedicationAssistance' },
    { title: 'Diet Assistant', icon: '', path: '/DietAssistant' },
    { title: 'Find a Doctor', icon: '', path: '/FindADoctor' },
    // Add more items as needed
  ];

  return (
    <div className="w-36 h-screen  text-[#1B4D3E] p-4 shadow-md ">
      <div className="flex flex-col space-y-4">
        {navItems.map((item) => (
          <div
            key={item.path}
            className={`flex flex-col items-center space-y-2 p-4 rounded-lg cursor-pointer ${
                pathname == item.path
                  ? 'bg-[#1B4D3E] text-white' // Highlight active page
                  : 'hover:bg-green-300  '
              }`}
            onClick={() => router.push(item.path)} // Use Next.js router for navigation
          >
            <span className="text-xl">{item.icon}</span>
            <p>{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
