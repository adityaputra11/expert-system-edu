'use client'

import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, Circle, CloudRain, Eye, Flame, Headphones, Heart, Mic, Music, ScanFace, Skull, Stethoscope, Thermometer, Wind, X } from 'lucide-react'
import { useState } from 'react'


interface Topic {
  code: string,
  icon: React.ComponentType
  label: string
  className?: string
  description?: string
}


interface Diagnose {
  diagnosis: String
  treatment: String
}

const topics: Topic[] = [
  { code: 'A1', icon: Headphones, label: "Sakit Kepala", className: "col-span-1 sm:col-span-2", description: "rasa sakit atau tekanan yang terjadi di kepala, kulit kepala, atau leher. Sakit kepala bisa terasa berdenyut, bergelombang, ditekan, atau tajam seperti ditusuk." },
  { code: 'A2', icon: Thermometer, label: "Demam", className: "col-span-1", description: "merupakan kondisi terjadinya peningkatan suhu tubuh di atas 38 derajat Celsius. Umumnya, demam merupakan respons tubuh atau gejala terhadap penyakit." },
  { code: 'A3', icon: Wind, label: "Batuk", className: "col-span-1 sm:col-span-2", description: "adalah respons alami tubuh untuk mengeluarkan benda asing, seperti kuman, virus, debu, atau zat iritatif, dari dalam saluran pernapasan. Meski begitu, batuk juga sering kali menandakan adanya gangguan kesehatan tertentu, mulai dari ISPA, alergi, asma, hingga kanker paru-paru." },
  { code: 'A4', icon: AlertCircle, label: "Flu", className: "col-span-1", description: "Flu atau influenza adalah infeksi virus yang menyerang hidung, tenggorokan, dan paru-paru. Penderita flu dapat mengalami demam, sakit kepala, pilek, hidung tersumbat, serta batuk." },
  { code: 'A5', icon: Heart, label: "Nyeri Dada", className: "col-span-1 sm:col-span-2", description: "Nyeri dada adalah kondisi ketika dada terasa seperti tertusuk, perih, atau tertekan. Nyeri ini bisa terjadi di dada sebelah kanan, sebelah kiri, atau dada tengah. Nyeri dada tidak boleh diabaikan, karena bisa jadi merupakan gejala dari serangan jantung." },
  { code: 'A6', icon: CloudRain, label: "Diare", className: "col-span-1", description: "Diare adalah gangguan pencernaan yang ditandai dengan buang air besar yang lebih sering dan teksturnya encer atau berair." },
  { code: 'A7', icon: Flame, label: "Sakit Perut/Lambung", className: "col-span-2 sm:col-span-3", description: "Sakit perut adalah rasa sakit atau nyeri yang muncul di perut, yaitu area di bagian depan tubuh antara tulang iga dan tulang panggul. Seseorang yang mengalami sakit perut dapat merasakan kram, mulas, atau sensasi seperti tertusuk di perut." },
  { code: 'A8', icon: Circle, label: "Sakit Otot & Sendi", className: "col-span-2 sm:col-span-3", description: "Nyeri sendi memiliki gejala rasa tidak nyaman, rasa sakit, atau peradangan pada setiap bagian dari sendi. Kondisi sakit biasanya meliputi tulang rawan, tulang, ligamen, tendon, atau otot." },
  { code: 'A9', icon: Mic, label: "Suara Serak/Hilang", className: "col-span-1 sm:col-span-2", description: "Suara serak adalah perubahan kualitas pada suara menjadi parau, lemah, atau sulit dikeluarkan. Kondisi ini menandakan adanya masalah pada pita suara sehingga bisa memengaruhi kualitas hidup." },
  { code: 'A10', icon: Music, label: "Migrain", className: "col-span-1", description: "Migrain adalah sakit kepala yang parah dan berdenyut yang disebabkan oleh gangguan saraf dan pembuluh darah di otak. Migrain biasanya terjadi di salah satu sisi kepala, tetapi bisa juga menyerang kedua sisi. Gejala migrain lainnya adalah: Mual, Muntah, Sensitivitas terhadap cahaya (fotofobia), Sensitivitas terhadap suara (fonofobia)" },
  { code: 'A11', icon: Skull, label: "Ruam", className: "col-span-1", description: "Ruam adalah perubahan pada kulit yang dapat berupa kemerahan, bintil, luka lepuh, atau perubahan tekstur dan warna kulit. Ruam bisa muncul tiba-tiba atau bertahap, dan bisa terasa gatal, kering, membengkak, atau seperti terbakar. Ruam dapat terjadi pada satu bagian kecil atau menutupi area yang lebih luas." },
  { code: 'A12', icon: ScanFace, label: "Sesak Napas", className: "col-span-2 sm:col-span-3", description: "Sesak napas, atau dispnea, adalah kondisi ketika seseorang kesulitan bernapas atau tidak mendapatkan cukup udara ke dalam paru-paru. Sesak napas bisa menjadi gejala dari berbagai penyakit atau kondisi, seperti asma, pneumonia, gangguan kecemasan, atau penyakit jantung." },
  { code: 'A13', icon: Eye, label: "Insomnia", className: "col-span-2", description: "Insomnia adalah jenis gangguan tidur yang terjadi ketika seseorang mengalami kesulitan atau tidak bisa tidur. Penyebab insomnia sangat beragam, bisa karena masalah fisik ataupun mental." },
]



export default function TopicButtons() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [hoveredTopic, setHoveredTopic] = useState<string | null>(null)
  const [diagnose, setDiagose] = useState<Diagnose | null>(null)

  const toggleTopic = (label: string) => {
    setSelectedTopics(prev =>
      prev.includes(label)
        ? prev.filter(topic => topic !== label)
        : [...prev, label]
    )
    setDiagose(null)
  }

  const handleSubmit = () => {
    const selectedCodes = topics
      .filter((topic) => selectedTopics.includes(topic.label))
      .map((topic) => topic.code);

    console.log("Selected Codes:", selectedCodes);

    const diagnosis = getDiagnosis(selectedCodes);
    setDiagose(diagnosis)
  };

  const getDiagnosis = (selectedCodes: string[]): Diagnose => {
    if (selectedCodes.length === 1) {
      switch (selectedCodes[0]) {
        case "A1":
          return {
            diagnosis: "Sakit Kepala Biasa",
            treatment: "Minum Paracetamol, istirahat yang cukup.",
          };
        case "A2":
          return {
            diagnosis: "Demam Ringan",
            treatment: "Minum banyak cairan, istirahat, dan konsumsi parasetamol jika suhu di atas 38°C.",
          };
        case "A3":
          return {
            diagnosis: "Batuk Ringan",
            treatment: "Minum air hangat, hindari makanan berminyak, dan konsumsi pereda batuk jika perlu.",
          };
        case "A4":
          return {
            diagnosis: "Flu Ringan",
            treatment: "Minum air hangat, hindari makanan berminyak, dan konsumsi pereda batuk jika perlu.",
          };
        case "A7":
          return {
            diagnosis: "Sakit Perut Biasa",
            treatment: "Konsumsi makanan ringan, hindari makanan pedas, dan minum teh jahe hangat.",
          };
          case "A13":
          return {
            diagnosis: "Insomnia Biasa",
            treatment: "Terapkan rutinitas tidur yang teratur, hindari konsumsi kafein menjelang malam, dan cobalah teknik relaksasi sebelum tidur.",
          };
        default:
          break;
      }
    }
    // Kasus untuk kombinasi dua gejala
  if (selectedCodes.length === 2) {
    if (selectedCodes.includes("A1") && selectedCodes.includes("A2")) {
      return {
        diagnosis: "Demam dengan Sakit Kepala",
        treatment: "Istirahat, minum banyak cairan, dan konsumsi parasetamol jika perlu.",
      };
    }
    if (selectedCodes.includes("A3") && selectedCodes.includes("A4")) {
      return {
        diagnosis: "Flu dengan Batuk",
        treatment: "Minum air hangat, hindari makanan berminyak, dan konsumsi pereda flu seperti dekongestan.",
      };
    }
    if (selectedCodes.includes("A5") && selectedCodes.includes("A12")) {
      return {
        diagnosis: "Nyeri Dada dan Sesak Napas",
        treatment: "Segera konsultasikan ke dokter untuk pemeriksaan lebih lanjut.",
      };
    }
    if (selectedCodes.includes("A6") && selectedCodes.includes("A7")) {
      return {
        diagnosis: "Diare dan Sakit Perut",
        treatment: "Minum cairan rehidrasi oral untuk mencegah dehidrasi, hindari makanan berat, dan konsultasikan jika gejala berlanjut.",
      };
    }
    if (selectedCodes.includes("A9") && selectedCodes.includes("A13")) {
      return {
        diagnosis: "Laringitis dengan Insomnia",
        treatment: "Hindari berbicara terlalu banyak, konsumsi cairan hangat, dan cobalah teknik relaksasi sebelum tidur.",
      };
    }
    if (selectedCodes.includes("A8") && selectedCodes.includes("A10")) {
      return {
        diagnosis: "Migrain dengan Nyeri Otot",
        treatment: "Istirahat di tempat yang tenang, hindari cahaya terang, dan lakukan peregangan ringan.",
      };
    }
  }
    if (selectedCodes.includes("A1") && selectedCodes.includes("A2") && selectedCodes.includes("A3") && selectedCodes.includes("A4")) {
      return {
        diagnosis: "Influenza",
        treatment: "Istirahat yang cukup, konsumsi cairan hangat, hindari aktivitas berat, dan gunakan obat pereda demam seperti paracetamol jika perlu.",
      };
    }
    if (selectedCodes.includes("A10")) {
      return {
        diagnosis: "Migrain",
        treatment: "Hindari paparan cahaya terang dan suara bising, istirahat di ruangan gelap, dan konsumsi obat pereda nyeri seperti ibuprofen.",
      };
    }
    if (selectedCodes.includes("A5") && selectedCodes.includes("A12")) {
      return {
        diagnosis: "Masalah Jantung",
        treatment: "Segera konsultasikan ke dokter atau pergi ke unit gawat darurat jika gejala terus berlanjut atau memburuk.",
      };
    }
    if (selectedCodes.includes("A11")) {
      return {
        diagnosis: "Infeksi Kulit/Alergi",
        treatment: "Gunakan salep antihistamin atau hydrocortisone untuk mengurangi gatal dan iritasi. Hindari alergen jika diketahui.",
      };
    }
    if (selectedCodes.includes("A7")) {
      return {
        diagnosis: "Gastritis/Maag",
        treatment: "Konsumsi makanan ringan, hindari makanan pedas atau berminyak, dan gunakan antasida jika perlu.",
      };
    }
    if (selectedCodes.includes("A13")) {
      return {
        diagnosis: "Insomnia",
        treatment: "Terapkan rutinitas tidur yang teratur, hindari konsumsi kafein menjelang malam, dan cobalah teknik relaksasi sebelum tidur.",
      };
    }
    if (selectedCodes.includes("A9")) {
      return {
        diagnosis: "Laringitis",
        treatment: "Hindari berbicara terlalu banyak, konsumsi cairan hangat, dan hindari merokok atau paparan polusi.",
      };
    }
    if (selectedCodes.includes("A8")) {
      return {
        diagnosis: "Nyeri Otot Kronis",
        treatment: "Lakukan peregangan ringan, kompres hangat pada otot yang nyeri, dan konsumsi obat pereda nyeri jika diperlukan.",
      };
    }
    if (selectedCodes.includes("A2") && selectedCodes.includes("A6") && selectedCodes.includes("A7")) {
      return {
        diagnosis: "Gastroenteritis",
        treatment: "Konsumsi cairan elektrolit untuk mencegah dehidrasi, hindari makanan berat, dan konsultasikan ke dokter jika gejala berlanjut.",
      };
    }
    return {
      diagnosis: "Tidak dapat menentukan diagnosis",
      treatment: "Silakan konsultasikan dengan dokter untuk pemeriksaan lebih lanjut.",
    };
  };

  return (
    <div className="max-w-7xl mx-auto p-4">

      <div className=" relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10">
        <h1 className="text-4xl font-bold text-center">
           <span className="text-blue-600">Sistem Pakar Medis</span> Diagnosa Cerdas
        </h1>
      </div>


      <h2 className="text-2xl font-bold mb-4 text-gray-800 pt-5">Jenis Keluhan</h2>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2 mb-6 relative">
        {topics.map((topic) => {
          const Icon = topic.icon
          const isSelected = selectedTopics.includes(topic.label)
          const isHovered = hoveredTopic === topic.label

          return (
            <div key={topic.label} className={cn("relative", topic.className)}>
              <motion.button
                className={cn(
                  "flex flex-col items-center justify-center gap-2 px-3 py-2 rounded-2xl text-sm transition-colors w-full",
                  isSelected
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                )}
                onHoverStart={() => setHoveredTopic(topic.label)}
                onHoverEnd={() => setHoveredTopic(null)}
                whileHover={{
                  position: "absolute",
                  scale: 1.1,
                  zIndex: 50,
                  minWidth: "250px",
                  borderBottomLeftRadius: "0px",
                  borderBottomRightRadius: "0px",
                  transition: {
                    duration: 0.1,
                    ease: "easeOut"
                  }
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleTopic(topic.label)}
              >
                <div className="flex items-center justify-center gap-2">
                  <Icon />
                  <span className="truncate">{topic.label}</span>
                </div>

                <AnimatePresence>
                  {isHovered && topic.description && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -10 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -10 }}
                      transition={{
                        type: "spring",
                        damping: 10,
                        stiffness: 300,
                        height: {
                          type: "keyframes",
                          damping: 10,
                          stiffness: 400,
                        },
                        opacity: {
                          duration: 0.15
                        }
                      }}
                      className="absolute left-0 right-0 bg-inherit rounded-2xl overflow-hidden"
                      style={{
                        top: "100%",
                        width: "100%",
                        zIndex: 51,
                        marginTop: "-0.3rem",
                        paddingTop: "0rem",
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        willChange: "transform, opacity, height"
                      }}
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-xs p-2 text-center leading-tight"
                      >
                        {topic.description}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.button>

            </div>
          )
        })}
      </div>
      {selectedTopics.length > 0 && (
        <div className="mt-6">
          <h3 className="text-2xl font-semibold mb-3 text-gray-800">Keluhan Pasien</h3>
          <div className="flex flex-wrap gap-2">
            {selectedTopics.map(topic => (
              <motion.button
                key={topic}
                className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleTopic(topic)}
              >
                {topic}
                <X className="w-4 h-4" />
              </motion.button>
            ))}
          </div>
          <button
            onClick={handleSubmit}
            className="mt-4 w-full px-6 py-3 bg-green-500 text-white rounded-3xl hover:bg-blue-600 transition-colors duration-200 font-semibold shadow-lg hover:shadow-xl"            >
            Submit Gejala
          </button>
          {diagnose && (
            <div className="mt-4 p-4 bg-white rounded-3xl shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-4">
                <Stethoscope className="w-10 h-10 text-blue-500 animate-spin-slow" />
                <span>Hasil Diagnosis</span>
              </h3>
              <div className="space-y-4">
                {/* Diagnosis Section */}
                <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl shadow-sm">
                  <h4 className="text-l font-semibold text-blue-600 mb-2">
                    Diagnosis
                  </h4>
                  <p className="text-l text-gray-800">
                    {diagnose.diagnosis}
                  </p>
                </div>
                {/* Treatment Section */}
                <div className="p-6 bg-green-50 border border-green-200 rounded-xl shadow-sm">
                  <h4 className="text-l font-semibold text-green-600 mb-2">
                    Saran Pengobatan
                  </h4>
                  <p className="text-l text-gray-800">
                    {diagnose.treatment}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

