import React, { useState } from 'react'
import { Users, Plane, Hotel, Car, DollarSign, Plus, X, Save } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/Card/card"
import { Alert } from "@/components/Alert/alert"
import Button from "@/components/Button/button"
import { Input } from "@/components/Input"; 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/Select/select"
import { Checkbox } from "@/components/Checkbox/checkbox"
//import { GuestType, PreferenceCardProps, defaultPreferences } from '@/features/settings/types'
import './Settings.scss';

interface GuestType {
  id: number;
  name: string;
  preferences: {
    flight?: {
      cabin: string;
      directOnly: boolean;
      refundable: boolean;
    };
    hotel?: {
      quality: string;
    };
    transport?: {
      service: string;
      carClass: string;
    };
    perDiem?: {
      amount: number;
    };
  };
}

interface PreferenceCardProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
  preferences?: any;
}

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
          preferences: {}
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
        <CardHeader>
          <div className="preference-card__header">
            <Icon className="preference-card__icon" />
            <CardTitle>{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {React.Children.map(children, child => {
            return React.cloneElement(child as React.ReactElement, { preferences: prefs });
          })}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="settings">
      <div className="settings__container">
        <div className="settings__header">
          <div className="settings__title-group">
            <h1 className="settings__title">Settings</h1>
            <p className="settings__subtitle">Manage your travel preferences and guest types</p>
          </div>
          <Button
            onClick={handleSave}
            variant="default"
            className="settings__save-button"
          >
            <Save size={20} />
            <span>Save Changes</span>
          </Button>
        </div>

        {showSaveAlert && (
          <Alert 
            variant="success"
            className="settings__alert"
          >
            Settings saved successfully!
          </Alert>
        )}

        <div className="settings__content">
          <Card>
            <CardHeader>
              <div className="guest-types__header">
                <div className="guest-types__title">
                  <Users className="guest-types__icon" />
                  <CardTitle>Guest Types</CardTitle>
                </div>
              </div>
              <CardDescription>
                Manage guest categories and their default preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="guest-types__content">
                <div className="guest-types__add">
                  <Input
                    type="text"
                    value={newGuestType}
                    onChange={(e) => setNewGuestType(e.target.value)}
                    placeholder="Enter new guest type"
                  />
                  <Button
                    onClick={handleAddGuestType}
                    variant="outline"
                    className="guest-types__add-button"
                  >
                    <Plus size={20} />
                    <span>Add Type</span>
                  </Button>
                </div>

                <div className="guest-types__list">
                  {guestTypes.map((type) => (
                    <div
                      key={type.id}
                      className="guest-type-item"
                    >
                      <span className="guest-type-item__name">{type.name}</span>
                      <Button
                        onClick={() => handleRemoveGuestType(type.id)}
                        variant="ghost"
                        className="guest-type-item__remove"
                      >
                        <X size={20} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Guest Type Preferences</CardTitle>
              <CardDescription>
                Configure travel preferences for each guest type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="guest-preferences">
                <label className="guest-preferences__label">
                  Select Guest Type
                </label>
                <Select value={selectedGuestType} onValueChange={setSelectedGuestType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a guest type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default (All Guest Types)</SelectItem>
                    {guestTypes.map(type => (
                      <SelectItem key={type.id} value={type.id.toString()}> {type.name} </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                

                {selectedGuestType && (
                  <div className="guest-preferences__selected">
                    <p>
                      Editing preferences for{' '}
                      <span className="guest-preferences__selected-name">
                        {guestTypes.find(t => t.id === Number(selectedGuestType))?.name}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="travel-preferences">
            <Card>
              <CardHeader>
                <CardTitle>Travel Preferences</CardTitle>
                <CardDescription>
                  Customize travel preferences for the selected guest type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="travel-preferences__cards">
                  <PreferenceCard title="Flight Preferences" icon={Plane}>
                    <div className="flight-preferences">
                      <div className="flight-preferences__cabin">
                        <label>Default Cabin Class</label>
                        <Select value="economy">
                          <SelectTrigger>
                            <SelectValue placeholder="Select cabin class" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="economy">Economy</SelectItem>
                            <SelectItem value="premium-economy">Premium Economy</SelectItem>
                            <SelectItem value="business">Business</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flight-preferences__options">
                        <Checkbox
                          //label="Prefer direct flights"
                          id="direct-flights"
                        />
                        <label>Prefer direct flights</label>
                        <Checkbox
                          //label="Refundable tickets only"
                          id="refundable-tickets"
                        />
                        <label>Refundable tickets only</label>
                      </div>
                    </div>
                  </PreferenceCard>

                  <PreferenceCard title="Hotel Preferences" icon={Hotel}>
                    <div className="hotel-preferences">
                      <label>Default Hotel Quality</label>
                      <Select value="3-star">
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
                    <div className="transport-preferences">
                      <div className="transport-preferences__service">
                        <label>Preferred Service</label>
                        <Select value="standard">
                          <SelectTrigger>
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
                    <div className="per-diem">
                      <label>Default Daily Amount</label>
                      <div className="per-diem__input">
                        <span className="per-diem__currency">$</span>
                        <Input
                          type="number"
                          placeholder="Enter amount"
                        />
                      </div>
                    </div>
                  </PreferenceCard>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;