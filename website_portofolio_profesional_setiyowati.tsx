import React, { useState, useEffect, useRef } from 'react';
import { 
  HeartPulse, 
  BookOpen, 
  Briefcase, 
  Video, 
  Award, 
  FileText, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle, 
  ChevronRight, 
  ExternalLink, 
  MessageSquare, 
  Send, 
  X, 
  Sparkles, 
  Clock, 
  Camera, 
  Layers,
  GraduationCap
} from 'lucide-react';

// --- DATA UTAMA PORTOFOLIO ---
const PROFILE = {
  nama: "SETIYOWATI",
  tagline: ["Perawat Lansia Profesional", "Caregiver Berpengalaman", "Ahli Administrasi & Akuntansi", "Video Editor CapCut"],
  tentang: `Halo, saya Setiyowati, seorang profesional di bidang Caregiver dan Perawat Lansia dengan pengalaman kerja lintas negara di Indonesia, Hong Kong, dan Malaysia. Saya berdedikasi memberikan pelayanan kesehatan yang aman, nyaman, dan berkualitas bagi lansia serta pasien dengan berbagai kondisi medis. 
  Saya berpengalaman merawat pasien dengan diagnosis demensia, diabetes melitus, stroke, penyakit jantung, pneumonia, PPOK, dan hipertensi. Selain di bidang kesehatan, latar belakang pendidikan Akuntansi dan berbagai pengalaman administratif membentuk saya menjadi pribadi yang disiplin, teliti, bertanggung jawab, serta mahir dalam pembuatan konten edukatif digital.`,
  biodata: {
    gender: "Perempuan",
    agama: "Islam",
    status: "Menikah, memiliki dua anak",
    alamat: "Dkh Sambong, Desa Kuncir, Kec. Ngetos, Kabupaten Nganjuk, Jawa Timur",
    email: "setiyawati426@gmail.com",
    wa: "6281261051877",
    waTeks: "+62 812-6105-1877"
  }
};

const PENGALAMAN_DAN_PENDIDIKAN = [
  {
    id: 1,
    tipe: "caregiver",
    tahun: "Terbaru (1 Tahun)",
    judul: "Caregiver & Perawat Lansia",
    lokasi: "Karimun, Kepulauan Riau",
    deskripsi: "Merawat pasien lanjut usia dengan diagnosa komplikasi PPOK (Penyakit Paru Obstruktif Kronis), hipertensi berat, serta gejala demensia aktif.",
    detail: ["Manajemen terapi oksigen & nebulizer harian", "Pemantauan berkala saturasi & tensi", "Pendampingan aktivitas harian penuh (ADL)"]
  },
  {
    id: 2,
    tipe: "caregiver",
    tahun: "2 Tahun",
    judul: "Spesialis Perawatan Jantung & Pneumonia",
    lokasi: "Batam, Kepulauan Riau",
    deskripsi: "Fokus merawat pasien dalam masa pemulihan pasca serangan jantung dan infeksi pneumonia paru-paru.",
    detail: ["Pemberian obat & asupan nutrisi ketat", "Koordinasi dengan dokter spesialis", "Latihan pernapasan mandiri"]
  },
  {
    id: 3,
    tipe: "pendidikan",
    tahun: "2019 – 2023",
    judul: "Guru / Pendidik PAUD",
    lokasi: "TKS Al Umara, Karimun Kepri",
    deskripsi: "Membimbing dan mengajar anak-anak usia dini dengan fokus pada perkembangan kognitif, motorik halus, dan pembentukan karakter sosial.",
    detail: ["Menyusun rencana ajar harian", "Melatih keterampilan kreativitas anak", "Komunikasi perkembangan anak kepada wali murid"]
  },
  {
    id: 4,
    tipe: "caregiver",
    tahun: "2 Tahun",
    judul: "Pendamping Pasien Stroke Pasca-Rawat",
    lokasi: "Malaysia (Sektor Kesehatan Domestik)",
    deskripsi: "Melakukan perawatan rehabilitasi mandiri di rumah untuk pasien stroke pasca serangan akut guna mengembalikan kekuatan motorik tubuh.",
    detail: ["Melatih mobilisasi fisik agar tidak cedera", "Pemantauan tanda vital harian", "Terapi okupasi sederhana"]
  },
  {
    id: 5,
    tipe: "caregiver",
    tahun: "4 Tahun",
    judul: "Caregiver Lansia Diabetes & Demensia",
    lokasi: "Hong Kong (Sektor Kesehatan Domestik)",
    deskripsi: "Merawat lansia dengan kondisi demensia (pikun) tingkat lanjut yang disertai diabetes tipe-2 kronis.",
    detail: ["Pemberian suntik insulin / Rysodex secara presisi", "Penyusunan menu diet khusus diabetes", "Stimulasi memori harian"]
  },
  {
    id: 6,
    tipe: "lainnya",
    tahun: "2012 – 2013",
    judul: "Guru / Pendidik PAUD",
    lokasi: "TKS Al Umara, Karimun Kepri",
    deskripsi: "Periode pertama mengajar anak usia dini dalam program pendidikan karakter lokal.",
    detail: ["Eksplorasi sensorik anak", "Pendampingan kemandirian fisik dasar"]
  },
  {
    id: 7,
    tipe: "lainnya",
    tahun: "2007 – 2010",
    judul: "Office Girl / Administrasi Kebersihan",
    lokasi: "Malaysia",
    deskripsi: "Bertanggung jawab penuh atas kebersihan, kerapian, dan ketersediaan logistik kantor harian perusahaan swasta.",
    detail: ["Pemberesan arsip dokumen fisik ringan", "Penyediaan suplai harian staf"]
  },
  {
    id: 8,
    tipe: "lainnya",
    tahun: "2003 – 2005",
    judul: "Karyawan & Penata Gaya Rambut",
    lokasi: "Salon Kapas Krampung, Surabaya",
    deskripsi: "Memberikan layanan perawatan kecantikan rambut, terapi kulit kepala, serta komunikasi interaktif yang ramah dengan pelanggan salon.",
    detail: ["Manajemen relasi pelanggan", "Keahlian estetika dasar"]
  },
  {
    id: 9,
    tipe: "lainnya",
    tahun: "2002 – 2003",
    judul: "Staf Administrasi Gudang",
    lokasi: "PT Sumarjati Luhur Prima, Nganjuk",
    deskripsi: "Mengelola seluruh pencatatan logistik keluar-masuk barang, peminjaman, serta pemeliharaan alat operasional pabrik.",
    detail: ["Pencatatan inventarisasi berbasis akuntansi", "Mencegah kehilangan alat operasional", "Penyusunan laporan bulanan"]
  },
  {
    id: 10,
    tipe: "pendidikan",
    tahun: "1999 – 2002",
    judul: "Pendidikan Menengah Kejuruan (SMK)",
    lokasi: "SMK Kosgoro Nganjuk",
    deskripsi: "Lulus dengan spesialisasi program keahlian Akuntansi. Menguasai dasar pembukuan keuangan, entri data, serta matematika ekonomi.",
    detail: ["Dasar-dasar pembukuan debit-kredit", "Penyusunan neraca keuangan sederhana", "Disiplin pengerjaan laporan keuangan"]
  }
];

const SKILLS = {
  hard: [
    { nama: "Activities of Daily Living (ADL)", ikon: HeartPulse, level: "Expert", deskripsi: "Mandi, berpakaian, mobilitas pasien aman, asupan nutrisi" },
    { nama: "Manajemen Obat & Alat Medis", ikon: HeartPulse, level: "Expert", deskripsi: "Tensi, saturasi, oksigen, nebulizer, termometer" },
    { nama: "Injeksi Medis Khusus", ikon: HeartPulse, level: "Advanced", deskripsi: "Suntik Insulin mandiri & penggunaan Rysodex" },
    { nama: "Mobilisasi & Terapi Fisik", ikon: HeartPulse, level: "Advanced", deskripsi: "Teknik memindahkan pasien dari ranjang ke kursi roda tanpa cedera" },
    { nama: "Administrasi Gudang", ikon: FileText, level: "Advanced", deskripsi: "Pencatatan logistik, kontrol stok, pembukuan keuangan dasar" },
    { nama: "Video Editing (CapCut)", ikon: Video, level: "Advanced", deskripsi: "Pembuatan konten video kreatif, edukasi kesehatan, & transisi dinamis" },
    { nama: "Desain Grafis (Canva)", ikon: Layers, level: "Intermediate", deskripsi: "Desain pamflet, poster promosi, & konten media sosial menarik" }
  ],
  soft: [
    { nama: "Tanggung Jawab Tinggi", detail: "Mengutamakan keselamatan nyawa & kenyamanan pasien utama." },
    { nama: "Kolaborasi Tim & Dokter", detail: "Mampu berkoordinasi efektif dengan keluarga dan tenaga medis profesional." },
    { nama: "Problem Solving Cepat", detail: "Sikap tenang dan solutif saat menghadapi kondisi medis darurat di rumah." },
    { nama: "Manajemen Waktu Disiplin", detail: "Tepat waktu dalam pemberian jadwal obat berkala dan terapi fisik harian." },
    { nama: "Komunikasi Publik Ramah", detail: "Kemampuan mengajar PAUD & melayani pelanggan salon mengasah keramahan berbicara." }
  ]
};

const SERTIFIKAT = [
  { id: 1, judul: "Sertifikat Kompetensi Caregiver Lansia Nasional", nomor: "No: REG/CG-092/2021", penerbit: "Lembaga Pelatihan Perawat Indonesia", tgl: "Desember 2021" },
  { id: 2, judul: "Sertifikasi Bantuan Hidup Dasar (BHD) & P3K", nomor: "No: BHD-MED/VIII/2022", penerbit: "Pusat Pelatihan Medis Darurat", tgl: "Agustus 2022" },
  { id: 3, judul: "Sertifikat Pelatihan Manajemen Demensia & Alzheimer", nomor: "No: ALZ-INST/2023", penerbit: "Asosiasi Caregiver Internasional", tgl: "Maret 2023" },
  { id: 4, judul: "Piagam Penghargaan Pengajar PAUD Inspiratif", nomor: "No: TK-UMR/AWARDS/2021", penerbit: "YPI Al Umara Karimun", tgl: "November 2021" },
  { id: 5, judul: "Sertifikat Keahlian Administrasi & Pembukuan Kas", nomor: "No: SK-KOS/AK-02/2002", penerbit: "SMK Kosgoro Nganjuk", tgl: "Mei 2002" }
];

const AWAL_BLOG = [
  {
    id: 1,
    kategori: "Keseharian & Kegiatan",
    judul: "Semangat Baru! Dokumentasi Selesai Sidang Skripsi & Persiapan Wisuda",
    tgl: "24 Juni 2026",
    deskripsi: "Sebuah perjalanan panjang dari bangku SMK hingga berhasil menyelesaikan ujian kelulusan akhir. Pembuktian bahwa belajar tidak mengenal batasan usia!",
    gambar: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 2,
    kategori: "Keseharian & Kegiatan",
    judul: "Aktivitas Sosial Selama Kuliah Kerja Nyata (KKN)",
    tgl: "15 Mei 2026",
    deskripsi: "Berbagi ilmu kesehatan dasar, teknik cuci tangan steril, dan pemeriksaan tensi gratis bagi warga desa tempat pelaksanaan KKN.",
    gambar: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: 3,
    kategori: "Tips Medis harian",
    judul: "Pentingnya Mengatur Pola Makan Bagi Penderita Diabetes Lansia",
    tgl: "10 April 2026",
    deskripsi: "Beberapa tips praktis dalam menyajikan menu rendah gula namun padat nutrisi untuk kakek-nenek yang menderita diabetes melitus.",
    gambar: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=600&auto=format&fit=crop"
  }
];

export default function App() {
  // --- STATE MANAGEMENT ---
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [subText, setSubText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);
  
  const [filterPengalaman, setFilterPengalaman] = useState("all");
  const [activeCert, setActiveCert] = useState(null);
  
  const [listBlog, setListBlog] = useState(AWAL_BLOG);
  const [showTambahBlog, setShowTambahBlog] = useState(false);
  const [newBlogJudul, setNewBlogJudul] = useState("");
  const [newBlogDeskripsi, setNewBlogDeskripsi] = useState("");
  const [newBlogKat, setNewBlogKat] = useState("Keseharian & Kegiatan");

  const [pesanKontak, setPesanKontak] = useState({ nama: "", email: "", pesan: "" });
  const [notifikasiKirim, setNotifikasiKirim] = useState("");

  const detailTentangRef = useRef(null);

  // --- ANIMASI TEKS BERJALAN (React Bits Effect) ---
  useEffect(() => {
    let timer;
    const fullText = PROFILE.tagline[taglineIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setSubText(fullText.substring(0, subText.length - 1));
        setTypingSpeed(40);
      }, typingSpeed);
    } else {
      timer = setTimeout(() => {
        setSubText(fullText.substring(0, subText.length + 1));
        setTypingSpeed(120);
      }, typingSpeed);
    }

    if (!isDeleting && subText === fullText) {
      timer = setTimeout(() => setIsDeleting(true), 1500); // Tahan sebentar
    } else if (isDeleting && subText === "") {
      setIsDeleting(false);
      setTaglineIndex((prev) => (prev + 1) % PROFILE.tagline.length);
    }

    return () => clearTimeout(timer);
  }, [subText, isDeleting, taglineIndex, typingSpeed]);

  // --- FILTER LINIMASA PENGALAMAN ---
  const filteredTimeline = PENGALAMAN_DAN_PENDIDIKAN.filter(item => {
    if (filterPengalaman === "all") return true;
    return item.tipe === filterPengalaman;
  });

  // --- KIRIM FORM KONTAK KE WA ---
  const handleKirimPesan = (e) => {
    e.preventDefault();
    if (!pesanKontak.nama || !pesanKontak.pesan) {
      setNotifikasiKirim("⚠ Mohon isi Nama dan Pesan Anda.");
      return;
    }
    const templateWA = `Halo Ibu Setiyowati, saya *${pesanKontak.nama}* (${pesanKontak.email || 'tanpa email'}). %0A%0A*Pesan:* %0A${pesanKontak.pesan}`;
    window.open(`https://wa.me/${PROFILE.biodata.wa}?text=${templateWA}`, '_blank');
    setNotifikasiKirim("✔ Berhasil mengarahkan ke WhatsApp.");
    setPesanKontak({ nama: "", email: "", pesan: "" });
  };

  // --- TAMBAH BLOG BARU (Simulated State) ---
  const handleTambahBlogSubmit = (e) => {
    e.preventDefault();
    if (!newBlogJudul || !newBlogDeskripsi) return;

    const baru = {
      id: Date.now(),
      kategori: newBlogKat,
      judul: newBlogJudul,
      tgl: "Baru Saja Diunggah",
      deskripsi: newBlogDeskripsi,
      gambar: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop"
    };

    setListBlog([baru, ...listBlog]);
    setNewBlogJudul("");
    setNewBlogDeskripsi("");
    setShowTambahBlog(false);
  };

  // --- SCROLL HALUS ---
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-red-600 selection:text-white">
      
      {/* --- HEADER NAVBAR --- */}
      <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-red-900/40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-red-600 to-rose-900 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-red-600/20">
              S
            </div>
            <div>
              <span className="font-bold tracking-wider text-lg text-white block">SETIYOWATI</span>
              <span className="text-[10px] text-red-500 uppercase tracking-widest block font-semibold">Caregiver & Admin</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <button onClick={() => scrollToSection('home')} className="hover:text-red-500 transition-colors py-2">Beranda</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-red-500 transition-colors py-2">Tentang Saya</button>
            <button onClick={() => scrollToSection('skills')} className="hover:text-red-500 transition-colors py-2">Keahlian</button>
            <button onClick={() => scrollToSection('timeline')} className="hover:text-red-500 transition-colors py-2">Pengalaman</button>
            <button onClick={() => scrollToSection('sertifikat')} className="hover:text-red-500 transition-colors py-2">Sertifikat</button>
            <button onClick={() => scrollToSection('blog')} className="hover:text-red-500 transition-colors py-2">Jurnal</button>
          </nav>

          <button 
            onClick={() => scrollToSection('kontak')} 
            className="px-4 py-2 text-xs uppercase tracking-wider font-bold rounded-lg border border-red-600 text-red-400 hover:bg-red-600 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(220,38,38,0.1)] hover:shadow-[0_0_25px_rgba(220,38,38,0.3)]"
          >
            Hubungi Saya
          </button>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-12 md:py-20">
        {/* Background Lights & Lines */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.12),transparent_60%)]" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-red-800/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-rose-900/10 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto px-4 z-10 text-center">
          
          {/* Tagline Kecil Atas */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/80 border border-red-800/60 text-red-400 text-xs font-semibold uppercase tracking-widest mb-6 animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            Portofolio Portofolio Multidimensi
          </div>

          {/* Nama Utama (Bermuatan Visual 3D Text & Gradien Merah) */}
          <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-4 select-none">
            <span className="text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">IBU </span>
            <span className="bg-gradient-to-r from-red-500 via-rose-600 to-red-400 bg-clip-text text-transparent filter drop-shadow-[0_5px_15px_rgba(220,38,38,0.3)]">
              {PROFILE.nama}
            </span>
          </h1>

          {/* Typing Animation dari React Bits */}
          <div className="h-12 md:h-16 flex items-center justify-center mb-8">
            <p className="text-lg md:text-3xl font-light text-slate-300">
              Profesi: <strong className="text-white font-semibold border-r-2 border-red-500 pr-1.5 animate-pulse">{subText}</strong>
            </p>
          </div>

          <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-400 leading-relaxed mb-10">
            Seorang Caregiver medis & Perawat Lansia bersertifikasi dengan riwayat kerja profesional di <span className="text-red-400 font-semibold">Surabaya, Hong Kong, & Malaysia</span>. Memadukan kedisiplinan ilmu Akuntansi dan kreativitas harian yang dinamis.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => scrollToSection('about')} 
              className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-red-600/30 flex items-center justify-center gap-2"
            >
              <User className="w-5 h-5" /> Pelajari Lebih Lanjut
            </button>
            <button 
              onClick={() => scrollToSection('kontak')} 
              className="px-8 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" /> Hubungi WA Langsung
            </button>
          </div>

        </div>

        {/* 3D-like Decorative Card Grid di Bagian Bawah Hero */}
        <div className="absolute bottom-4 left-0 right-0 hidden lg:block">
          <div className="max-w-4xl mx-auto grid grid-cols-4 gap-4 px-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur text-center transform hover:-translate-y-2 hover:border-red-500/40 transition-all duration-300">
              <span className="text-2xl font-black text-red-500 block">11+</span>
              <span className="text-xs text-slate-400">Tahun Pengalaman Total</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur text-center transform hover:-translate-y-2 hover:border-red-500/40 transition-all duration-300">
              <span className="text-2xl font-black text-red-500 block">3</span>
              <span className="text-xs text-slate-400">Negara Wilayah Kerja</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur text-center transform hover:-translate-y-2 hover:border-red-500/40 transition-all duration-300">
              <span className="text-2xl font-black text-red-500 block">5+</span>
              <span className="text-xs text-slate-400">Sertifikat Resmi</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur text-center transform hover:-translate-y-2 hover:border-red-500/40 transition-all duration-300">
              <span className="text-2xl font-black text-red-500 block">100%</span>
              <span className="text-xs text-slate-400">Dedikasi & Tanggung Jawab</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- ABOUT ME SECTION --- */}
      <section id="about" className="py-20 border-t border-slate-900 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Tentang Saya</h2>
            <div className="w-16 h-1 bg-red-600 mx-auto mt-3 rounded-full" />
            <p className="text-slate-400 text-sm mt-3">Mengenal lebih dekat perjalanan profesional multidimensi saya.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Visual Kartu Avatar 3D Portofolio */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group w-72 sm:w-80 h-96 [perspective:1000px]">
                <div className="absolute inset-0 bg-gradient-to-tr from-red-600 to-rose-950 rounded-2xl opacity-30 blur-2xl group-hover:opacity-50 transition-opacity duration-300" />
                
                {/* Efek Kartu 3D Melayang */}
                <div className="w-full h-full rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-red-800/40 p-6 flex flex-col justify-between transform transition-all duration-500 group-hover:[transform:rotateX(5deg)_rotateY(-10deg)] hover:border-red-500">
                  
                  {/* Bagian Atas Kartu */}
                  <div className="flex justify-between items-start">
                    <div className="px-3 py-1 bg-red-950 border border-red-800 rounded-lg text-red-400 text-xs font-bold uppercase">
                      ID: {PROFILE.nama}
                    </div>
                    <Award className="w-6 h-6 text-red-500" />
                  </div>

                  {/* Representasi Gambar Kreatif Pengganti Foto Asli */}
                  <div className="my-6 flex-1 flex flex-col items-center justify-center bg-slate-900 rounded-xl border border-slate-800 relative overflow-hidden group-hover:bg-slate-850 transition-colors">
                    <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-red-600/10 rounded-full blur-xl" />
                    <HeartPulse className="w-16 h-16 text-red-500 animate-pulse mb-3" />
                    <span className="text-xs text-slate-400 font-medium px-4 text-center">Spesialis Asuhan Keperawatan Lansia</span>
                  </div>

                  {/* Bagian Bawah Kartu */}
                  <div>
                    <div className="text-lg font-bold text-white mb-1">Setiyowati</div>
                    <div className="text-xs text-red-400 font-medium">Asal Nganjuk, Jawa Timur</div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full mt-3 overflow-hidden">
                      <div className="bg-red-500 h-full w-[95%]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Narasi Portofolio */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-2xl font-bold text-white">Pendampingan Pasien & Pelayanan Kesehatan Prima</h3>
              <p className="text-slate-300 leading-relaxed text-justify text-sm sm:text-base">
                {PROFILE.tentang}
              </p>

              {/* Data Detail Ringkas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-900">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-950 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="text-xs text-slate-300">
                    <span className="block text-slate-500 font-semibold">Alamat Domisili</span>
                    {PROFILE.biodata.alamat}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-950 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="text-xs text-slate-300">
                    <span className="block text-slate-500 font-semibold">Alamat Surat Elektronik (Email)</span>
                    {PROFILE.biodata.email}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-950 flex items-center justify-center">
                    <HeartPulse className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="text-xs text-slate-300">
                    <span className="block text-slate-500 font-semibold">Kategori Spesialisasi</span>
                    Demensia, Diabetes, Stroke, PPOK, Jantung
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-950 flex items-center justify-center">
                    <Video className="w-4 h-4 text-red-500" />
                  </div>
                  <div className="text-xs text-slate-300">
                    <span className="block text-slate-500 font-semibold">Kreativitas Tambahan</span>
                    CapCut Video Editor & Canva Designer
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* --- HARD & SOFT SKILLS --- */}
      <section id="skills" className="py-20 bg-slate-900/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Kompetensi & Keterampilan</h2>
            <div className="w-16 h-1 bg-red-600 mx-auto mt-3 rounded-full" />
            <p className="text-slate-400 text-sm mt-3">Aspek kemampuan praktis medis, administrasi logistik, serta karakter kepribadian.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Hard Skills - Kiri */}
            <div className="lg:col-span-7 space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                <span className="w-2.5 h-6 bg-red-600 rounded-full inline-block" />
                Hard Skills & Kemampuan Praktis
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SKILLS.hard.map((skill, index) => {
                  const IkonSkill = skill.ikon;
                  return (
                    <div 
                      key={index} 
                      className="p-5 rounded-xl bg-slate-900 border border-slate-800 hover:border-red-600/50 transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden"
                    >
                      <div className="absolute right-0 top-0 w-16 h-16 bg-red-600/5 rounded-bl-3xl group-hover:bg-red-600/10 transition-colors" />
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-red-950 flex items-center justify-center text-red-500 shrink-0">
                          <IkonSkill className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-white leading-tight">{skill.nama}</h4>
                            <span className="text-[10px] bg-red-950 border border-red-800 text-red-400 px-1.5 py-0.5 rounded font-black uppercase">
                              {skill.level}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 mt-2 leading-relaxed">{skill.deskripsi}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Soft Skills - Kanan */}
            <div className="lg:col-span-5 space-y-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                <span className="w-2.5 h-6 bg-red-600 rounded-full inline-block" />
                Karakter & Soft Skills
              </h3>

              <div className="space-y-4">
                {SKILLS.soft.map((skill, index) => (
                  <div key={index} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-red-950 flex items-center justify-center text-red-500 text-xs font-black shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">{skill.nama}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{skill.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* --- EXPERIENCES TIMELINE --- */}
      <section id="timeline" className="py-20 border-t border-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Riwayat Kerja & Pendidikan</h2>
            <div className="w-16 h-1 bg-red-600 mx-auto mt-3 rounded-full" />
            <p className="text-slate-400 text-sm mt-3">Lini masa perjalanan karier yang komprehensif dan terdokumentasi.</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-center gap-2 mb-12 overflow-x-auto pb-2">
            <button 
              onClick={() => setFilterPengalaman("all")}
              className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${filterPengalaman === "all" ? "bg-red-600 text-white" : "bg-slate-900 text-slate-400 hover:text-white"}`}
            >
              Semua Riwayat
            </button>
            <button 
              onClick={() => setFilterPengalaman("caregiver")}
              className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${filterPengalaman === "caregiver" ? "bg-red-600 text-white" : "bg-slate-900 text-slate-400 hover:text-white"}`}
            >
              Hanya Caregiver
            </button>
            <button 
              onClick={() => setFilterPengalaman("pendidikan")}
              className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${filterPengalaman === "pendidikan" ? "bg-red-600 text-white" : "bg-slate-900 text-slate-400 hover:text-white"}`}
            >
              Hanya Pendidikan
            </button>
            <button 
              onClick={() => setFilterPengalaman("lainnya")}
              className={`px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${filterPengalaman === "lainnya" ? "bg-red-600 text-white" : "bg-slate-900 text-slate-400 hover:text-white"}`}
            >
              Hanya Administrasi & Lainnya
            </button>
          </div>

          {/* Timeline Visual Grid */}
          <div className="relative border-l-2 border-slate-800 ml-4 md:ml-32 space-y-12">
            {filteredTimeline.map((item) => (
              <div key={item.id} className="relative pl-8 group">
                
                {/* Penanda Tahun di Kiri (Untuk layar sedang/besar) */}
                <div className="absolute -left-4 top-1.5 md:left-auto md:right-full md:mr-10 md:-translate-x-1/2 text-right hidden md:block">
                  <span className="px-3 py-1 bg-red-950 border border-red-800 rounded-lg text-red-400 font-mono text-xs font-bold whitespace-nowrap">
                    {item.tahun}
                  </span>
                </div>

                {/* Dot Lini Masa */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-red-600 group-hover:bg-red-500 transition-colors z-10" />

                {/* Konten Utama */}
                <div className="bg-slate-900/75 border border-slate-800 p-6 rounded-2xl group-hover:border-red-600/30 transition-all duration-300 shadow-xl relative overflow-hidden">
                  
                  {/* Tag Tipe Responsif */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="text-xs text-red-500 font-bold uppercase tracking-widest">{item.lokasi}</span>
                    <span className="md:hidden text-xs bg-red-950 border border-red-800 text-red-400 px-2 py-0.5 rounded font-bold">{item.tahun}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-red-400 transition-colors mb-2">
                    {item.judul}
                  </h3>

                  <p className="text-sm text-slate-300 mb-4 leading-relaxed">{item.deskripsi}</p>

                  {/* Detil Kerja */}
                  {item.detail && item.detail.length > 0 && (
                    <div className="border-t border-slate-800/60 pt-4">
                      <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Tugas & Kontribusi Utama:</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {item.detail.map((det, indexIdx) => (
                          <li key={indexIdx} className="flex items-center gap-2 text-xs text-slate-400">
                            <CheckCircle className="w-3.5 h-3.5 text-red-500 shrink-0" />
                            {det}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- CERTIFICATES SHOWCASE --- */}
      <section id="sertifikat" className="py-20 bg-slate-900/20 border-t border-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Sertifikasi & Lisensi Resmi</h2>
            <div className="w-16 h-1 bg-red-600 mx-auto mt-3 rounded-full" />
            <p className="text-slate-400 text-sm mt-3">Bukti kualifikasi resmi di bidang asuhan keperawatan lansia serta administrasi.</p>
          </div>

          {/* Grid Sertifikat */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERTIFIKAT.map((cert) => (
              <div 
                key={cert.id} 
                onClick={() => setActiveCert(cert)}
                className="cursor-pointer group p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-red-600/60 transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-red-950/80 flex items-center justify-center text-red-500 mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-white text-base group-hover:text-red-400 transition-colors leading-snug mb-2">
                    {cert.judul}
                  </h3>
                  <span className="text-xs text-slate-500 block mb-1">{cert.nomor}</span>
                  <span className="text-xs text-red-500/80 font-medium block">{cert.penerbit}</span>
                </div>

                <div className="flex items-center justify-between border-t border-slate-800 mt-6 pt-4 text-xs">
                  <span className="text-slate-500">{cert.tgl}</span>
                  <span className="text-red-500 font-semibold group-hover:underline flex items-center gap-1">
                    Detail <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* --- LIGHTBOX MODAL UNTUK SERTIFIKAT --- */}
      {activeCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="bg-slate-900 border border-red-800/50 max-w-lg w-full rounded-2xl p-6 relative shadow-2xl">
            <button 
              onClick={() => setActiveCert(null)}
              className="absolute top-4 right-4 p-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center pt-4">
              <Award className="w-16 h-16 text-red-500 mx-auto mb-4 animate-bounce" />
              <h3 className="text-xl font-bold text-white mb-2">{activeCert.judul}</h3>
              <p className="text-xs text-red-500 font-semibold uppercase tracking-wider mb-4">{activeCert.penerbit}</p>
              
              <div className="my-6 p-4 rounded-xl bg-slate-950 text-left border border-slate-800 space-y-3">
                <div className="flex justify-between text-xs border-b border-slate-900 pb-2">
                  <span className="text-slate-500 font-semibold">Nomor Registrasi:</span>
                  <span className="text-slate-300 font-mono">{activeCert.nomor}</span>
                </div>
                <div className="flex justify-between text-xs border-b border-slate-900 pb-2">
                  <span className="text-slate-500 font-semibold">Tanggal Terbit:</span>
                  <span className="text-slate-300">{activeCert.tgl}</span>
                </div>
                <div className="flex justify-between text-xs pb-1">
                  <span className="text-slate-500 font-semibold">Status Validasi:</span>
                  <span className="text-emerald-500 font-bold flex items-center gap-1">✔ Terverifikasi Aktif</span>
                </div>
              </div>

              <div className="flex gap-2">
                <a 
                  href={`https://wa.me/${PROFILE.biodata.wa}?text=Halo Ibu Setiyowati, boleh saya konfirmasi sertifikat: *${activeCert.judul}* ?`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold uppercase transition-colors"
                >
                  Minta Salinan PDF
                </a>
                <button 
                  onClick={() => setActiveCert(null)}
                  className="px-5 py-2.5 bg-slate-950 hover:bg-slate-800 rounded-xl text-xs text-slate-300"
                >
                  Tutup
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* --- BLOG / JURNAL PERJALANAN AKTIVITAS --- */}
      <section id="blog" className="py-20 bg-slate-950 border-t border-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Jurnal Perjalanan & Keseharian</h2>
              <div className="w-16 h-1 bg-red-600 mt-3 rounded-full" />
              <p className="text-slate-400 text-sm mt-3">Aktivitas perkuliahan, KKN, momentum wisuda, dan tips kesehatan lansia.</p>
            </div>

            <button 
              onClick={() => setShowTambahBlog(true)}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-red-600 text-slate-200 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 self-start md:self-auto transition-all"
            >
              <Camera className="w-4 h-4 text-red-500" /> Tulis Kegiatan Baru
            </button>
          </div>

          {/* Form Dialog Simulasi Tambah Blog */}
          {showTambahBlog && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
              <form onSubmit={handleTambahBlogSubmit} className="bg-slate-900 border border-slate-800 max-w-md w-full rounded-2xl p-6 relative">
                <button 
                  type="button"
                  onClick={() => setShowTambahBlog(false)}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <h3 className="text-lg font-bold text-white mb-4">Unggah Kegiatan Baru (Simulasi)</h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase">Kategori</label>
                    <select 
                      value={newBlogKat} 
                      onChange={(e) => setNewBlogKat(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-red-600"
                    >
                      <option value="Keseharian & Kegiatan">Keseharian & Kegiatan</option>
                      <option value="Perkembangan Akademik">Perkembangan Akademik</option>
                      <option value="Tips Medis harian">Tips Medis harian</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase">Judul Kegiatan</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Contoh: Kegiatan KKN Sukses"
                      value={newBlogJudul}
                      onChange={(e) => setNewBlogJudul(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase">Cerita Singkat</label>
                    <textarea 
                      required
                      rows="4"
                      placeholder="Tuliskan pengalaman atau detail aktivitas harian di sini..."
                      value={newBlogDeskripsi}
                      onChange={(e) => setNewBlogDeskripsi(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-red-600 resize-none"
                    />
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <button 
                    type="submit"
                    className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold uppercase transition-colors"
                  >
                    Terbitkan Sekarang
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowTambahBlog(false)}
                    className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-slate-400 rounded-lg text-xs"
                  >
                    Batal
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Grid Item Blog */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {listBlog.map((post) => (
              <article key={post.id} className="group rounded-2xl bg-slate-900 overflow-hidden border border-slate-800 hover:border-red-600/35 transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-950">
                    <img 
                      src={post.gambar} 
                      alt={post.judul} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-2.5 py-1 rounded bg-red-950/90 border border-red-800/80 text-red-400 text-[10px] font-bold uppercase">
                        {post.kategori}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                      <Clock className="w-3.5 h-3.5 text-slate-600" />
                      <span>{post.tgl}</span>
                    </div>

                    <h3 className="font-bold text-white text-base leading-snug group-hover:text-red-400 transition-colors mb-3">
                      {post.judul}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                      {post.deskripsi}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-slate-850 flex items-center justify-between text-xs">
                  <span className="text-slate-500">Penulis: Ibu Setiyowati</span>
                  <span className="text-red-500 font-bold group-hover:underline cursor-pointer flex items-center gap-1">
                    Baca Jurnal <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* --- CONTACT ME & CONNECTIVITY --- */}
      <section id="kontak" className="py-20 bg-slate-900/40 border-t border-slate-900 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Hubungi Saya</h2>
            <div className="w-16 h-1 bg-red-600 mx-auto mt-3 rounded-full" />
            <p className="text-slate-400 text-sm mt-3">Ajukan konsultasi medis lansia, asuhan keperawatan rumah tangga, atau penugasan kerja.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Sisi Informasi Kontak - Kiri */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Saluran Komunikasi Langsung</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Silakan hubungi saya melalui saluran di bawah ini. Saya siap melakukan konsultasi tatap muka maupun diskusi kontrak kerja profesional secara terbuka.
                </p>
              </div>

              <div className="space-y-4">
                
                {/* Whatsapp */}
                <a 
                  href={`https://wa.me/${PROFILE.biodata.wa}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-red-600/40 transition-all duration-300 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-emerald-950 flex items-center justify-center text-emerald-500 shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-black">WhatsApp Chat</span>
                    <span className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">{PROFILE.biodata.waTeks}</span>
                  </div>
                </a>

                {/* Email */}
                <a 
                  href={`mailto:${PROFILE.biodata.email}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-red-600/40 transition-all duration-300 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-red-950 flex items-center justify-center text-red-500 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-black">Email Resmi</span>
                    <span className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">{PROFILE.biodata.email}</span>
                  </div>
                </a>

                {/* Alamat */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <div className="w-11 h-11 rounded-xl bg-red-950/80 flex items-center justify-center text-red-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-500 uppercase tracking-widest font-black">Domisili Kantor</span>
                    <span className="text-xs text-slate-300 leading-tight block">{PROFILE.biodata.alamat}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Sisi Form Interaktif - Kanan */}
            <div className="lg:col-span-7 bg-slate-900 p-8 rounded-2xl border border-slate-800 relative">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <Send className="w-5 h-5 text-red-500" /> Kirim Pesan Elektronik Langsung
              </h3>

              <form onSubmit={handleKirimPesan} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Nama Lengkap</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Contoh: Dr. Budi Setiawan"
                      value={pesanKontak.nama}
                      onChange={(e) => setPesanKontak({ ...pesanKontak, nama: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-red-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Alamat Email (Opsional)</label>
                    <input 
                      type="email" 
                      placeholder="Contoh: budi@rumahlayanan.com"
                      value={pesanKontak.email}
                      onChange={(e) => setPesanKontak({ ...pesanKontak, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-red-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Pesan & Kebutuhan Layanan Anda</label>
                  <textarea 
                    required
                    rows="5"
                    placeholder="Tuliskan spesifikasi kebutuhan perawat lansia, asuhan medis harian, atau administrasi kantor di sini..."
                    value={pesanKontak.pesan}
                    onChange={(e) => setPesanKontak({ ...pesanKontak, pesan: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none focus:border-red-600 resize-none"
                  />
                </div>

                {notifikasiKirim && (
                  <div className={`p-3 rounded-lg text-xs font-bold ${notifikasiKirim.startsWith('⚠') ? 'bg-amber-950 text-amber-400 border border-amber-900' : 'bg-emerald-950 text-emerald-400 border border-emerald-900'}`}>
                    {notifikasiKirim}
                  </div>
                )}

                <button 
                  type="submit"
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-lg shadow-red-600/20"
                >
                  Kirim via WhatsApp
                </button>
              </form>
            </div>

          </div>

        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="flex justify-center gap-6 text-slate-400 mb-4">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-red-500 transition-colors">LinkedIn</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-red-500 transition-colors">Instagram</a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-red-500 transition-colors">TikTok</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-red-500 transition-colors">GitHub</a>
          </div>
          <p>© 2026 Setiyowati Portofolio. Seluruh Hak Cipta Dilindungi.</p>
          <p className="text-[10px] text-slate-600">Dibuat menggunakan React, Tailwind CSS, Lucide Icons, dan Terinspirasi dari Animasi React Bits.</p>
        </div>
      </footer>

    </div>
  );
}