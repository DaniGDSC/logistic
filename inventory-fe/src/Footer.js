function Footer() {
    return (
      <footer className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <ul className="flex space-x-4">
            <li><a href="#privacy" className="hover:underline">Privacy Policy</a></li>
            <li><a href="#terms" className="hover:underline">Terms of Service</a></li>
          </ul>
          <div>
            <p>Email: info@inventorymanagement.com</p>
            <p>Phone: 123-456-7890</p>
          </div>
        </div>
      </footer>
    );
  }

  export default Footer;