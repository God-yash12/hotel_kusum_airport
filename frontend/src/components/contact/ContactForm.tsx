import { Mail, MapPin, Phone } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

const ContactData = [
  {
    id: 1,
    title: "Address",
    description: "123 Main Street, Cityville, ST 12345",
    icon: <MapPin className="h-8 w-8" />,
  },
  {
    id: 2,
    title: "Email",
    description: "info@example.com",
    icon: <Mail className="h-8 w-8" />,
  },
  {
    id: 3,
    title: "Phone",
    description: "(123) 456-7890",
    icon: <Phone className="h-8 w-8" />,
  }
];

const ContactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits long"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

type ContactFormData = z.infer<typeof ContactFormSchema>;

// Mock API call function
const submitContactForm = async (data: ContactFormData): Promise<{ success: boolean }> => {
  // Replace this with your actual API call
  console.log("Submitting form data:", data);
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
  return { success: true };
};

export const ContactForm = () => {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }
  });

  const mutation = useMutation({
    mutationFn: submitContactForm,
    onSuccess: () => {
      toast.success("Your message has been sent successfully!");
      form.reset();
    },
    onError: () => {
      toast.error("Failed to send message. Please try again.");
    }
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className="container max-w-6xl mx-auto px-4 py-12 md:py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 mb-12">
        {ContactData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 p-8 flex flex-col items-center text-center group hover:bg-[#C3A165]"
          >
            <div className="bg-amber-100/30 p-4 rounded-full mb-6 group-hover:bg-amber-100/50 transition-colors duration-300">
              <div className="text-amber-600 group-hover:text-white transition-colors duration-300">
                {item.icon}
              </div>
            </div>
            <div className="space-y-2 hover:text-white transition-colors duration-300">
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-white">{item.title}</h3>
              <p className="text-gray-600 text-lg group-hover:text-white">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <div className='rounded-lg overflow-hidden'>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9851.18439488413!2d83.46860021607426!3d27.668468627510673!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3996857eac033a47%3A0xb45d8cbf5d94a5d3!2sHotel%20Pauwa!5e0!3m2!1sen!2snp!4v1752321806078!5m2!1sen!2snp" 
            width="100%" 
            height="450" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className='rounded-lg'
          ></iframe>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-md'>
          <h2 className='text-2xl font-bold text-gray-800 mb-6'>Send us a message</h2>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} className="focus-visible:ring-0 focus-visible:ring-offset-0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" {...field} className="focus-visible:ring-0 focus-visible:ring-offset-0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="+9 9834235422" {...field} className="focus-visible:ring-0 focus-visible:ring-offset-0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="Regarding my booking" {...field} className="focus-visible:ring-0 focus-visible:ring-offset-0" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Your message here..." 
                        rows={5} 
                        {...field} 
                        className="focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className='w-full bg-[#C3A165] text-white hover:bg-[#B08C54]'
                disabled={mutation.isPending}
              >
                {mutation.isPending ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};