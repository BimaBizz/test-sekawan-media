import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      error : {
        emailInvalid : "Email is invalid",
        passwordInvalid : "Password must be at least 8 characters long",
        loginFailed : "An error occurred. Please try again.",
        passwordNotMatch : "Passwords do not match",
      },
      login: {
        messageLogin : "Login In to Dashboard Kit",
        subMessageLogin : "Enter your email and password bellow",
        email : "Email",
        password : "Password",
        login : "Login",
        loading: "Loading...",
        forgotPassword: "Forgot Password?",
        didnotHaveAccount: "Don't have an account?",
        signUp: "Sign Up",
      },
      signup: {
        messageSignup : "Sign Up to Dashboard Kit",
        subMessageLogin : "Enter your email and password bellow",
        fullName : "Full Name",
        userName : "User Name",
        email : "Email",
        password : "Password",
        confirmPassword : "Confirm Password",
        signup : "Sign Up",
        loading: "Loading...",
        didnotHaveAccount: "Already have an account?",
        login: "Login",
      },
      sidebar: {
        overview: "Overview",
        tickets : "Tickets",
        ideas : "Ideas",
        contacts : "Contacts",
        agents : "Agents",
        articles : "Articles",
        settings : "Settings",
        subscription : "Subcription",
      },
      home : {
          title : "Overview",
          settings : "Settings",
          dark : "Dark",
          light : "Light",
          logout : "Logout",
          unresolved : "Unresolved",
          overdue : "Overdue",
          open : "Open",
          onHold : "On Hold",
          today : "Today",
          yesterday : "Yesterday",
          trends : "Today's trends",
          resolve : "Resolved",
          received : "Received",
          avarage : "Average first response time",
          avarage2 : "Average response time",
          sla : "Resolution within SLA",
      },
      tiketTask : {
        unresolvedTickets : "Unresolved Tickets",
        viewDetails : "View Details",
        grup : "Group: Support",
        technicalIssue : "Technical Issue",
        refundRequest : "Refund Request",
        pending : "Pending",
        other : "Other",
        tasks : "Tasks",
        viewAll : "View All",
        createNewTask : "Create New Task",
      },
      notification: {
        title: "Notification",
        reviewed: "reviewed",
        waitingReview: "waiting for review",
        createdTiket: "Created tiket"
      },
      searchTiket : {
        search : "Search Tickets",
        button : "Search",
      },
      createTask: {
        title: "Create new Ticket",
        priorityLabel: "Priority",
        typeLabel: "Type",
        descriptionLabel: "Description",
        createButton: "Create",
        priorityOptions: {
          NORMAL: "NORMAL",
          MEDIUM: "MEDIUM",
          HIGH: "HIGH"
        },
        typeOptions: {
          Technical_issue: "Technical issue",
          Refund_request: "Refund request",
          Pending: "Pending",
          Other: "Other"
        }
      },
      ticketsPage: {
        tickets: "Tickets",
        createTicket: "Create Tickets",
        sort: "Sort",
        filter: "Filter",
        ticketDetails: "Ticket Details",
        customerName: "Customer Name",
        date: "Date",
        priority: "Priority",
        loading: "Loading...",
        noTickets: "No tickets available.",
        limitOptions: {
          5: "5",
          10: "10",
          25: "25",
          50: "50",
          100: "100"
        },
        page: "Page",
        type : "Type",
        userName : "Username",
        date : "Date",
        
      },
      tiketDetails: {
        description: "Description",
        priority: {
          HIGH: "HIGH",
          MEDIUM: "MEDIUM",
          NORMAL: "NORMAL"
        },
        settings: "Settings",
        hold: "Hold",
        open: "Open",
        overdue: "Overdue",
        resolved: "Resolved",
        waiting: "Waiting",
        created: "Created",
        resolvedDate: "Resolved Date",
        createdDate: "Created Date",
    },
    },
  },
  id: {
    translation: {
        error : {
            emailInvalid : "Email tidak valid",
            passwordInvalid : "Kata sandi harus terdiri lebih dari 8 karakter",
            loginFailed : "Terjadi kesalahan. Silakan coba lagi.",
            passwordNotMatch : "Kata sandi tidak sama",
          },
        login: {
            messageLogin : "Masuk ke Dashboard Kit",
            subMessageLogin : "Masukkan email dan kata sandi Anda di bawah",
            email : "Email",
            password : "Kata Sandi",
            login : "Masuk",
            loading: "Memuat...",
            forgotPassword: "Lupa kata sandi?",
            didnotHaveAccount: "Belum punya akun?",
            signUp: "Daftar",
          },
        signup: {
          messageSignup : "Daftar ke Dashboard Kit",
          subMessageLogin : "Masukkan email dan kata sandi Anda di bawah",
          fullName : "Nama Lengkap",
          userName : "Nama Pengguna",
          email : "Email",
          password : "kata sandi",
          confirmPassword : "konfirmasi kata sandi",
          signup : "Daftar",
          loading: "Memuat...",
          didnotHaveAccount: "Sudah punya akun?",
          login: "Masuk",
        },
        sidebar: {
          overview: "Ringkasan",
          tickets : "Tiket",
          ideas : "Ide",
          contacts : "Kontak",
          agents : "Agent",
          articles : "Artikel",
          settings : "Pengaturan",
          subscription : "Berlangganan",
        },
        home : {
            title : "Ringkasan",
            settings : "Pengaturan",
            dark : "Gelap",
            light : "Terang",
            logout : "Keluar",
            unresolved : "Belum diselesaikan",
            overdue : "Kedaluwarsa",
            open : "Di Buka",
            onHold : "Di Tahan",
            today : "Hari Ini",
            yesterday : "Kemarin",
            trends : "Trends Hari Ini",
            resolve : "Terselesaikan",
            received : "Diterima",
            avarage : "Rata-rata waktu Respon Awal",
            avarage2 : "Rata-rata Waktu Respon",
            sla : "Respon Dalam SLA",
        },
        tiketTask : {
          unresolvedTickets : "Tiket Belum Diselesaikan",
          viewDetails : "Lihat Detail",
          grup : "Grup: Support",
          technicalIssue : "Masalah Teknis",
          refundRequest : "Permintaan Refund",
          pending : "Pending",
          other : "Lainnya",
          tasks : "Tugas",
          viewAll : "Lihat Semua",
          createNewTask : "Buat Tugas Baru",
        },
        notification: {
          title: "Pemberitahuan",
          reviewed: "dibalas",
          waitingReview: "sedang ditinjau",
          createdTiket: "Membuat tiket"
        },
        searchTiket : {
          search : "Cari Tiket",
          button : "Cari",
        },
        createTask: {
          title: "Buat Tiket Baru",
          priorityLabel: "Prioritas",
          typeLabel: "Tipe",
          descriptionLabel: "Deskripsi",
          createButton: "Buat",
          priorityOptions: {
            NORMAL: "NORMAL",
            MEDIUM: "MEDIUM",
            HIGH: "TINGGI"
          },
          typeOptions: {
            Technical_issue: "Masalah Teknis",
            Refund_request: "Permintaan Refund",
            Pending: "Pending",
            Other: "Lainnya"
          }
        },
        ticketsPage: {
            tickets: "Tiket",
            createTicket: "Buat Tiket",
            sort: "Urutkan",
            filter: "Saring",
            ticketDetails: "Rincian Tiket",
            customerName: "Nama Pelanggan",
            date: "Tanggal",
            priority: "Prioritas",
            loading: "Memuat...",
            noTickets: "Tidak ada tiket tersedia.",
            limitOptions: {
              5: "5",
              10: "10",
              25: "25",
              50: "50",
              100: "100"
            },
            page: "Halaman",
            type : "Tipe",
            userName : "Nama Pengguna",
            date : "Tgl",
          },
          tiketDetails: {
            description: "Deskripsi",
            priority: {
              HIGH: "TINGGI",
              MEDIUM: "SEDANG",
              NORMAL: "NORMAL"
            },
            settings: "Pengaturan",
            hold: "Tahan",
            open: "Buka",
            overdue: "Terlambat",
            reject: "Tolak",
            view: "Dilihat",
            typeTicket: "Jenis Tiket",
            from: "dari"
          }
    }
  }
};

const lang = localStorage.getItem('lang') || 'en';

if (!localStorage.getItem('lang')) {
  localStorage.setItem('lang', 'en');
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "en",
    lng: lang, // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false 
    }
  });

  export default i18n;