import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";
import { Mail, Phone, MessageSquare, MapPin, Clock } from "lucide-react";

// Icon mapping
const ContactIcons = {
  Email: Mail,
  Phone: Phone,
  Whatsapp: MessageSquare,
  Address: MapPin,
  Hours: Clock,
};

// --- ContactItem ---
interface ContactItemProps {
  Icon: React.ElementType;
  title: string;
  value: string;
}
const ContactItem: React.FC<ContactItemProps> = ({ Icon, title, value }) => (
  <div className="flex items-start space-x-3">
    <div className="flex-shrink-0 p-2 border shadow-md border-gray-200 rounded-xl bg-[#FFFFFF] text-gray-700 mt-0.5">
      <Icon className="w-5 h-5" />
    </div>
    <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-700">{title}</span>
      <span className="text-base text-gray-900 font-normal">{value}</span>
    </div>
  </div>
);

// --- LocationOrHoursItem ---
interface LocationOrHoursItemProps {
  Icon: React.ElementType;
  title: string;
  children: React.ReactNode; // ✅ Fix: can accept div/span/etc
}
const LocationOrHoursItem: React.FC<LocationOrHoursItemProps> = ({
  Icon,
  title,
  children,
}) => (
  <div className="flex items-start space-x-3 ">
    <div className="flex-shrink-0 text-gray-700 mt-0.5 p-2 border shadow-md border-gray-200 rounded-xl bg-[#FFFFFF]">
      <Icon className="w-5 h-5" />
    </div>
    <div className="flex flex-col">
      <span className="text-sm font-medium text-gray-700">{title}</span>
      {children}
    </div>
  </div>
);

// --- SocialIcon ---
interface SocialIconProps {
  Icon: React.ElementType;
  href: string;
}
const SocialIcon: React.FC<SocialIconProps> = ({ Icon, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="p-3 border border-gray-300 rounded-lg text-gray-600 hover:text-blue-600 transition duration-150"
  >
    <Icon className="w-5 h-5" />
  </a>
);

export default function ContactCard() {
  return (
    <div className="p-6 bg-white border-2 border-[#e8e3dc] rounded-xl">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Contact Information Preview
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        How your contact information will appear on the website
      </p>

      <div className="p-6 rounded-lg bg-[linear-gradient(135deg,#faf9f7,rgba(232,227,220,0.3))]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10">
          <div className="space-y-6">
            <ContactItem
              Icon={ContactIcons.Email}
              title="Email"
              value="support@thundra.com"
            />
            <ContactItem
              Icon={ContactIcons.Phone}
              title="Phone"
              value="+49 30 12345678"
            />
            <ContactItem
              Icon={ContactIcons.Whatsapp}
              title="WhatsApp"
              value="+49 151 23456789"
            />
          </div>

          <div className="space-y-6">
            <LocationOrHoursItem Icon={ContactIcons.Address} title="Address">
              <span className="text-base text-gray-900 font-normal">
                Friedrichstraße 123, 10117 Berlin, Germany
              </span>
            </LocationOrHoursItem>

            <LocationOrHoursItem
              Icon={ContactIcons.Hours}
              title="Business Hours"
            >
              <div className="text-base text-gray-900 font-normal">
                <p>
                  <span className="font-medium">Monday - Friday:</span> 9:00 AM
                  - 6:00 PM
                </p>
                <p>
                  <span className="font-medium">Saturday:</span> 10:00 AM - 4:00
                  PM
                </p>
                <p>
                  <span className="font-medium">Sunday:</span> Closed
                </p>
              </div>
            </LocationOrHoursItem>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-base font-semibold text-gray-700 mb-4">
          Follow Us
        </h3>
        <div className="flex space-x-3">
          <SocialIcon Icon={FaFacebookF} href="#" />
          <SocialIcon Icon={FaInstagram} href="#" />
          <SocialIcon Icon={FaTwitter} href="#" />
          <SocialIcon Icon={FaLinkedinIn} href="#" />
        </div>
      </div>
    </div>
  );
}
