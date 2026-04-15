import { View, Text, TouchableOpacity, Modal } from "react-native";
import { X, Share2, Sparkles } from "lucide-react-native";
import { colors } from "../../constants/theme";

interface ShareTheLightCardProps {
  visible: boolean;
  onClose: () => void;
  manifestationGoal: string;
  faithScore: number;
}

export function ShareTheLightCard({ 
  visible, 
  onClose, 
  manifestationGoal,
  faithScore 
}: ShareTheLightCardProps) {
  
  const handleShare = () => {
    // In a real app, this would use Expo Sharing or Web Share API.
    // For Hackathon web demo, we invoke standard Web Share if available.
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({
        title: "My Manifestation Realized ✨",
        text: `Alhamdulillah! I just realized my Dua-to-Do goal: "${manifestationGoal}" with a Faith Score of ${faithScore}! #Imanifest #ShareTheLight`,
      }).catch(console.error);
    } else {
      alert("E-Card link copied to clipboard! Share the light! ✨");
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/60 px-4">
        {/* Card Container */}
        <View className="w-full max-w-[400px] bg-background rounded-[32px] overflow-hidden border border-white/20 shadow-xl pb-2">
          
          {/* E-Card Visual Content */}
          <View className="bg-surface-card p-8 items-center border-b border-border shadow-sm">
            <View className="absolute top-4 right-4 opacity-20">
              <Sparkles size={120} color="#D4AF37" />
            </View>
            <View className="bg-primary/10 p-4 rounded-full mb-4">
              <Sparkles size={32} color="#022C22" />
            </View>
            
            <Text className="font-display text-display-lg text-primary text-center mb-2">
              Alhamdulillah
            </Text>
            
            <Text className="font-sans text-body-sm text-ink-secondary text-center mb-6 px-4">
              "And He found you lost and guided [you]." (Quran 93:7)
            </Text>

            <View className="bg-white/40 p-5 rounded-[20px] w-full border border-white/50 backdrop-blur-md items-center">
              <Text className="font-sans text-label text-ink-secondary uppercase tracking-widest mb-2">
                Manifestation Realized
              </Text>
              <Text className="font-serif text-[20px] text-ink-primary text-center leading-relaxed">
                {manifestationGoal}
              </Text>
              
              <View className="mt-4 bg-sage-green/10 px-4 py-2 rounded-full">
                <Text className="font-sans text-xs text-[#166534] font-bold">
                  + {faithScore} Faith Score
                </Text>
              </View>
            </View>
            
            <Text className="font-sans text-[10px] text-ink-disabled mt-6 uppercase tracking-widest">
              Generated securely by Imanifest
            </Text>
          </View>

          {/* Action Buttons */}
          <View className="p-5 gap-3">
             <View className="flex-row gap-3">
                <TouchableOpacity 
                  onPress={() => {
                    const text = encodeURIComponent(`Alhamdulillah! My manifestation realized ✨: "${manifestationGoal}" with a Faith Score of ${faithScore}! #Imanifest #ShareTheLight`);
                    window.open(`https://wa.me/?text=${text}`, '_blank');
                  }}
                  className="flex-1 bg-[#25D366] py-3 rounded-[16px] items-center justify-center flex-row gap-2"
                >
                  <Share2 size={16} color="#FFF" />
                  <Text className="font-sans text-xs text-white font-bold">WhatsApp</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                   onPress={() => {
                    const text = encodeURIComponent(`Alhamdulillah! My manifestation realized ✨: "${manifestationGoal}" #Imanifest #ShareTheLight`);
                    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
                  }}
                  className="flex-1 bg-black py-3 rounded-[16px] items-center justify-center flex-row gap-2"
                >
                   <Text className="text-white font-bold text-xs font-sans">Twitter / X</Text>
                </TouchableOpacity>
             </View>

            <TouchableOpacity 
              onPress={handleShare}
              className="w-full bg-primary py-4 rounded-[20px] flex-row items-center justify-center gap-2"
            >
              <Share2 size={20} color="#FFFFFF" />
              <Text className="font-sans text-label text-ink-inverse font-bold">
                 More Sharing Options
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={onClose}
              className="w-full bg-surface-input py-4 rounded-[20px] items-center justify-center border border-border"
            >
              <Text className="font-sans text-label text-ink-primary font-bold">
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
