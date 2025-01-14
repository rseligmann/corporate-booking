import React, { useState } from 'react'
import { Users, Plane, Hotel, Car, DollarSign, Plus, X, Save } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  GuestType,
  PreferenceCardProps,
  defaultPreferences
} from '@/features/settings/types'

const Settings = () => {
  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const [selectedGuestType, setSelectedGuestType] = useState('');
  const [guestTypes, setGuestTypes] = useState<GuestType[]>([
    { 
      id: 1, 
      name: 'Interview',
      preferences: {
        flight: {
          cabin: 'Economy',
          directOnly: false,
          refundable: true
        },
        hotel: {
          quality: '4-star'
        },
        transport: {
          service: 'Uber',
          carClass: 'Standard'
        },
        perDiem: {
          amount: 75
        }
      }
    },
    { 
      id: 2, 
      name: 'Contract Work',
      preferences: {
        flight: {
          cabin: 'Economy',
          directOnly: false,
          refundable: false
        },
        hotel: {
          quality: '3-star'
        },
        transport: {
          service: 'Lyft',
          carClass: 'Standard'
        },
        perDiem: {
          amount: 50
        }
      }
    },
    { 
      id: 3, 
      name: 'Student Visit',
      preferences: {
        flight: {
          cabin: 'Economy',
          directOnly: false,
          refundable: false
        },
        hotel: {
          quality: '3-star'
        },
        transport: {
          service: 'Uber',
          carClass: 'Standard'
        },
        perDiem: {
          amount: 40
        }
      }
    },
    { 
      id: 4, 
      name: 'Internship',
      preferences: {
        flight: {
          cabin: 'Economy',
          directOnly: false,
          refundable: false
        },
        hotel: {
          quality: '3-star'
        },
        transport: {
          service: 'Uber',
          carClass: 'Standard'
        },
        perDiem: {
          amount: 45
        }
      }
    }
  ]);
  const [newGuestType, setNewGuestType] = useState('');

  const handleAddGuestType = () => {
    if (newGuestType.trim()) {
      setGuestTypes([
        ...guestTypes,
        { 
          id: guestTypes.length + 1, 
          name: newGuestType.trim(),
          preferences: {...defaultPreferences}
        }
      ]);
      setNewGuestType('');
    }
  };

  const handleRemoveGuestType = (id: number) => {
    setGuestTypes(guestTypes.filter(type => type.id !== id));
  };

  const handleSave = () => {
    setShowSaveAlert(true);
    setTimeout(() => setShowSaveAlert(false), 3000);
  };

  const PreferenceCard = ({ title, icon: Icon, children }: PreferenceCardProps) => {
    const getPreferencesForSelectedType = () => {
      if (!selectedGuestType) return null;
      const guestType = guestTypes.find(t => t.id === Number(selectedGuestType));
      return guestType?.preferences;
    };
  
    const prefs = getPreferencesForSelectedType();
  
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center space-x-2">
            <Icon className="w-5 h-5 text-gray-500" />
            <CardTitle className="text-base font-medium">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          
          {React.Children.map(children, child => {
            // Clone the child elements and pass the preferences as props
            return React.cloneElement(child, { preferences: prefs });
          })}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
            <p className="text-gray-600">Manage your travel preferences and guest types</p>
          </div>
          <Button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700"
          >
            <Save size={20} />
            <span>Save Changes</span>
          </Button>
        </div>

        {showSaveAlert && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">
              Settings saved successfully!
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          {/* Guest Types Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-gray-500" />
                  <CardTitle>Guest Types</CardTitle>
                </div>
              </div>
              <CardDescription>
                Manage guest categories and their default preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Add New Guest Type */}
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    value={newGuestType}
                    onChange={(e) => setNewGuestType(e.target.value)}
                    placeholder="Enter new guest type"
                    className="flex-1"
                  />
                  <Button
                    onClick={handleAddGuestType}
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <Plus size={20} />
                    <span>Add Type</span>
                  </Button>
                </div>

                {/* Guest Types List */}
                <div className="grid grid-cols-2 gap-4">
                  {guestTypes.map((type) => (
                    <div
                      key={type.id}
                      className="flex items-center justify-between p-3 border rounded-lg bg-white"
                    >
                      <span className="font-medium">{type.name}</span>
                      <Button
                        onClick={() => handleRemoveGuestType(type.id)}
                        variant="ghost"
                        size="sm"
                      >
                        <X size={20} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Guest Type Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Guest Type Preferences</CardTitle>
              <CardDescription>
                Configure travel preferences for each guest type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Guest Type
                </label>
                <Select value={selectedGuestType} onValueChange={setSelectedGuestType}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a guest type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default (All Guest Types)</SelectItem>
                    {guestTypes.map((type) => (
                      <SelectItem key={type.id} value={type.id.toString()}>{type.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {selectedGuestType && (
                <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                  <p className="text-sm text-blue-700">
                    Editing preferences for{' '}
                    <span className="font-medium">
                      {guestTypes.find(t => t.id === Number(selectedGuestType))?.name}
                    </span>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Travel Preferences Section */}
          <Card>
            <CardHeader>
              <CardTitle>Travel Preferences</CardTitle>
              <CardDescription>
                Customize travel preferences for the selected guest type
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <PreferenceCard title="Flight Preferences" icon={Plane}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Default Cabin Class
                    </label>
                    <Select defaultValue="economy">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select cabin class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="economy">Economy</SelectItem>
                        <SelectItem value="premium-economy">Premium Economy</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex space-x-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="direct-flights" />
                      <label htmlFor="direct-flights" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Prefer direct flights
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="refundable-tickets" />
                      <label htmlFor="refundable-tickets" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Refundable tickets only
                      </label>
                    </div>
                  </div>
                </div>
              </PreferenceCard>

              <PreferenceCard title="Hotel Preferences" icon={Hotel}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Default Hotel Quality
                  </label>
                  <Select defaultValue="3-star">
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select hotel quality" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3-star">⭐⭐⭐ 3-star hotels</SelectItem>
                      <SelectItem value="4-star">⭐⭐⭐⭐ 4-star hotels</SelectItem>
                      <SelectItem value="5-star">⭐⭐⭐⭐⭐ 5-star hotels</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </PreferenceCard>

              <PreferenceCard title="Ground Transport" icon={Car}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Preferred Service
                    </label>
                    <Select defaultValue="uber">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select preferred service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="uber">Uber</SelectItem>
                        <SelectItem value="lyft">Lyft</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Default Car Class
                    </label>
                    <Select defaultValue="standard">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select car class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="suv">SUV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </PreferenceCard>

              <PreferenceCard title="Per Diem Settings" icon={DollarSign}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Default Daily Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-gray-500">$</span>
                    <Input
                      type="number"
                      className="pl-8"
                      placeholder="Enter amount"
                    />
                  </div>
                </div>
              </PreferenceCard>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;