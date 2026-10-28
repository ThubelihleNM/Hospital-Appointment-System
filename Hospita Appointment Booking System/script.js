const doctors = [
 {id:"d1",name:"Dr. Ananya Sharma",specialty:"Cardiology",qualification:"MBBS, MD · Cardiology",experience:12,fee:800,rating:"4.9",availability:"Today",photo:"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=700&q=80",bio:"Heart health and preventive cardiology"},
 {id:"d2",name:"Dr. Rahul Mehta",specialty:"Neurology",qualification:"MBBS, DM · Neurology",experience:10,fee:900,rating:"4.8",availability:"Today",photo:"https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=700&q=80",bio:"Neurological care and headache treatment"},
 {id:"d3",name:"Dr. Priya Kapoor",specialty:"Dermatology",qualification:"MBBS, MD · Dermatology",experience:8,fee:700,rating:"4.9",availability:"Tomorrow",photo:"https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=700&q=80",bio:"Skin health and dermatological care"},
 {id:"d4",name:"Dr. Arjun Singh",specialty:"Orthopedics",qualification:"MBBS, MS · Orthopedics",experience:15,fee:850,rating:"4.8",availability:"Today",photo:"https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=700&q=80",bio:"Bone, joint and sports injury care"},
 {id:"d5",name:"Dr. Neha Verma",specialty:"Pediatrics",qualification:"MBBS, MD · Pediatrics",experience:9,fee:650,rating:"5.0",availability:"Tomorrow",photo:"https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=700&q=80",bio:"Child wellness and preventive health"},
 {id:"d6",name:"Dr. Kabir Khanna",specialty:"General Medicine",qualification:"MBBS, MD · Internal Medicine",experience:11,fee:500,rating:"4.9",availability:"Today",photo:"https://images.unsplash.com/photo-1612531386530-97286d97c2d2?auto=format&fit=crop&w=700&q=80",bio:"Primary care and general health concerns"},
 {id:"d7",name:"Dr. Simran Gill",specialty:"Gynecology",qualification:"MBBS, MS · Obstetrics & Gynecology",experience:13,fee:800,rating:"4.9",availability:"Tomorrow",photo:"https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=700&q=80",bio:"Women's health and wellness"},
 {id:"d8",name:"Dr. Vikram Rao",specialty:"Ophthalmology",qualification:"MBBS, MS · Ophthalmology",experience:14,fee:750,rating:"4.8",availability:"Today",photo:"https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=700&q=80",bio:"Eye examinations and vision care"},
 {id:"d9",name:"Dr. Meera Joshi",specialty:"Dentistry",qualification:"BDS, MDS · Dentistry",experience:7,fee:600,rating:"4.9",availability:"Tomorrow",photo:"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=700&q=80",bio:"Preventive dentistry and oral health"}
];
const STORAGE_KEY = "carepoint_demo_appointments_v1";
const timeSlots = ["09:00 AM","09:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 PM","02:00 PM","02:30 PM","03:00 PM","03:30 PM","04:00 PM","04:30 PM"];
const $ = id => document.getElementById(id);
let activeFilter = "";
let toastTimer;
function getAppointments(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||"[]")}catch(e){return []}}
function saveAppointments(items){localStorage.setItem(STORAGE_KEY,JSON.stringify(items))}
function escapeHTML(value){return String(value??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function showToast(message){const toast=$("toast");toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),3200)}
function initDepartments(){
 const specialties=[...new Set(doctors.map(d=>d.specialty))];
 $("heroSpecialty").innerHTML='<option value="">All departments</option>'+specialties.map(s=>`<option value="${escapeHTML(s)}">${escapeHTML(s)}</option>`).join("");
 $("filterPills").innerHTML='<button class="filter-pill selected" data-filter="">All doctors</button>'+specialties.slice(0,5).map(s=>`<button class="filter-pill" data-filter="${escapeHTML(s)}">${escapeHTML(s)}</button>`).join("");
 $("filterPills").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(!b)return;activeFilter=b.dataset.filter;document.querySelectorAll(".filter-pill").forEach(p=>p.classList.toggle("selected",p.dataset.filter===activeFilter));renderDoctors()});
}
function renderDoctors(){
 const query=$("doctorSearch").value.trim().toLowerCase();
 const list=doctors.filter(d=>(!activeFilter||d.specialty===activeFilter)&&(!query||`${d.name} ${d.specialty} ${d.qualification}`.toLowerCase().includes(query)));
 $("resultsCount").textContent=`Showing ${list.length} of ${doctors.length} doctors`;
 $("doctorGrid").innerHTML=list.map(d=>`<article class="doctor-card">
  <div class="doctor-photo-wrap"><img class="doctor-photo" src="${escapeHTML(d.photo)}" alt="${escapeHTML(d.name)}" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/700x500/eaf2f8/244568?text=Doctor'"><span class="doctor-badge">● Available ${escapeHTML(d.availability.toLowerCase())}</span><span class="doctor-rating">★ ${escapeHTML(d.rating)}</span></div>
  <div class="doctor-info"><div class="doctor-topline"><div><h3 class="doctor-name">${escapeHTML(d.name)}</h3><div class="doctor-qualification">${escapeHTML(d.qualification)}</div></div></div>
  <div class="doctor-specialty">${escapeHTML(d.specialty)}</div><div class="doctor-meta"><span>Experience <strong>${d.experience} years</strong></span><span>Consultation <strong>In-person</strong></span></div>
  <div class="doctor-footer"><div class="doctor-fee">Consultation fee<strong>₹${d.fee}</strong></div><button class="btn btn-primary" data-book="${d.id}">Book visit <span>→</span></button></div></div></article>`).join("");
 $("emptyState").classList.toggle("hidden",list.length!==0);$("doctorGrid").classList.toggle("hidden",list.length===0);
}
function openBooking(id){
 const d=doctors.find(doc=>doc.id===id);if(!d)return;
 $("doctorId").value=id;
 $("selectedDoctor").innerHTML=`<img src="${escapeHTML(d.photo)}" alt=""><div><strong>${escapeHTML(d.name)}</strong><small>${escapeHTML(d.specialty)} · ₹${d.fee} consultation</small></div>`;
 const dateInput=$("appointmentDate");const now=new Date();const localToday=new Date(now.getTime()-now.getTimezoneOffset()*60000).toISOString().slice(0,10);dateInput.min=localToday;dateInput.value=localToday;
 updateTimeSlots();
 $("bookingModal").classList.remove("hidden");document.body.style.overflow="hidden";setTimeout(()=>$("patientName").focus(),50);
}
function getAvailableSlots(date, doctorId){
 const booked=getAppointments().filter(a=>a.date===date&&a.doctorId===doctorId&&a.status==="Booked").map(a=>a.time);
 const today=new Date();
 const todayString=new Date(today.getTime()-today.getTimezoneOffset()*60000).toISOString().slice(0,10);
 const isToday=date===todayString;
 const nowMinutes=today.getHours()*60+today.getMinutes();
 return timeSlots.filter(t=>{
   if(booked.includes(t))return false;
   if(!isToday)return true;
   const m=t.match(/(\d+):(\d+)\s(AM|PM)/);
   const h=Number(m[1])%12+(m[3]==="PM"?12:0);
   return h*60+Number(m[2])>nowMinutes+20;
 });
}
function updateTimeSlots(){
 const date=$("appointmentDate").value;
 const doctorId=$("doctorId").value;
 const options=getAvailableSlots(date,doctorId);
 $("appointmentTime").innerHTML='<option value="">Select a time</option>'+(options.length?options.map(t=>`<option value="${t}">${t}</option>`).join(""):'<option value="" disabled>No slots available for this date</option>');
 if(date && !options.length){
   showToast("Alert: This doctor is not available on the selected date. Please choose another date.");
   $("appointmentTime").setCustomValidity("This doctor has no available appointment slots on this date.");
 } else {
   $("appointmentTime").setCustomValidity("");
 }
}
function closeBooking(){$("bookingModal").classList.add("hidden");document.body.style.overflow="";$("bookingForm").reset()}
function formatDate(date){return new Date(date+"T00:00:00").toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}
function renderAppointments(){
 const items=getAppointments().sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time));
 const active=items.filter(a=>a.status==="Booked");
 $("navCount").textContent=active.length;$("appointmentTotal").textContent=`${items.length} booking${items.length===1?"":"s"}`;
 $("emptyAppointments").classList.toggle("hidden",items.length!==0);
 $("appointmentsList").innerHTML=items.map(a=>{const d=doctors.find(doc=>doc.id===a.doctorId)||{name:a.doctorName,specialty:a.specialty,fee:a.fee};const dt=new Date(a.date+"T00:00:00");return `<article class="appointment-card"><div class="appointment-date-box"><span>${dt.toLocaleDateString("en-IN",{month:"short"})}</span><strong>${dt.getDate()}</strong></div><div class="appointment-details"><h3>${escapeHTML(d.name)}</h3><p>${escapeHTML(d.specialty)} · ${escapeHTML(a.time)} · ${escapeHTML(a.patientName)}</p><p>${escapeHTML(formatDate(a.date))} · Ref: ${escapeHTML(a.id)}</p><span class="appointment-status" style="${a.status==="Cancelled"?'background:#fff0ee;color:#c45c50':''}">${escapeHTML(a.status)}</span></div><div class="appointment-actions"><strong>₹${Number(a.fee).toLocaleString("en-IN")}</strong>${a.status==="Booked"?`<button class="cancel-btn" data-cancel="${escapeHTML(a.id)}">Cancel booking</button>`:""}</div></article>`}).join("");
}
$("doctorGrid").addEventListener("click",e=>{const b=e.target.closest("[data-book]");if(b)openBooking(b.dataset.book)});
$("appointmentsList").addEventListener("click",e=>{const b=e.target.closest("[data-cancel]");if(!b)return;if(!confirm("Cancel this demo appointment?"))return;const items=getAppointments();const a=items.find(x=>x.id===b.dataset.cancel);if(a){a.status="Cancelled";saveAppointments(items);renderAppointments();showToast("Appointment cancelled.");}});
$("doctorSearch").addEventListener("input",renderDoctors);
$("searchButton").addEventListener("click",()=>{$("doctorSearch").value=$("heroSearch").value;$("doctorSearch").dispatchEvent(new Event("input"));const spec=$("heroSpecialty").value;activeFilter=spec;document.querySelectorAll(".filter-pill").forEach(p=>p.classList.toggle("selected",p.dataset.filter===activeFilter));renderDoctors();$("doctors").scrollIntoView({behavior:"smooth"})});
$("heroSearch").addEventListener("keydown",e=>{if(e.key==="Enter")$("searchButton").click()});
$("heroSpecialty").addEventListener("change",()=>{$("searchButton").click()});
$("resetSearch").addEventListener("click",()=>{$("doctorSearch").value="";$("heroSearch").value="";$("heroSpecialty").value="";activeFilter="";document.querySelectorAll(".filter-pill").forEach(p=>p.classList.toggle("selected",p.dataset.filter===""));renderDoctors()});
$("closeModal").addEventListener("click",closeBooking);
$("bookingModal").addEventListener("click",e=>{if(e.target===$("bookingModal"))closeBooking()});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("bookingModal").classList.contains("hidden"))closeBooking()});
$("appointmentDate").addEventListener("change",updateTimeSlots);
$("bookingForm").addEventListener("submit",e=>{
 e.preventDefault();const form=e.currentTarget;if(!form.reportValidity())return;
 const id=$("doctorId").value;const d=doctors.find(doc=>doc.id===id);if(!d)return;
 const date=$("appointmentDate").value,time=$("appointmentTime").value;
 if(!date||!time){showToast("Please select an appointment date and time.");return}
 const items=getAppointments();
 const available=getAvailableSlots(date,id);
 if(!available.length || !available.includes(time)){
   showToast("Alert: This doctor is not available at the selected date/time. Please choose another slot.");
   updateTimeSlots();
   $("appointmentTime").focus();
   return;
 }
 if(items.some(a=>a.date===date&&a.time===time&&a.doctorId===id&&a.status==="Booked")){
   showToast("Alert: This slot is already booked. Please select another time.");
   updateTimeSlots();
   $("appointmentTime").focus();
   return;
 }
 const appointment={id:"CP"+Date.now().toString().slice(-8),doctorId:d.id,doctorName:d.name,specialty:d.specialty,fee:d.fee,patientName:$("patientName").value.trim(),email:$("patientEmail").value.trim(),phone:$("patientPhone").value.trim(),date,time,reason:$("appointmentReason").value.trim(),status:"Booked",createdAt:new Date().toISOString()};
 items.push(appointment);try{saveAppointments(items)}catch(err){showToast("Unable to save. Please check browser storage settings.");return}
 closeBooking();renderAppointments();showToast(`Successfully booked! Your appointment with ${d.name} is confirmed for ${formatDate(date)} at ${time}.`);$("appointments").scrollIntoView({behavior:"smooth"});
});
$("menuToggle").addEventListener("click",()=>{$("mainNav").classList.toggle("open")});
$("mainNav").addEventListener("click",e=>{if(e.target.closest("a"))$("mainNav").classList.remove("open")});

// Demo-only account system: stored locally in this browser, not secure authentication.
const AUTH_KEY = "carepoint_demo_accounts_v1";
const SESSION_KEY = "carepoint_demo_session_v1";
let authMode = "signin";
function getAccounts(){try{return JSON.parse(localStorage.getItem(AUTH_KEY)||"[]")}catch(e){return []}}
function getSession(){try{return JSON.parse(localStorage.getItem(SESSION_KEY)||"null")}catch(e){return null}}
function setAuthMode(mode){
 authMode=mode;
 const signup=mode==="signup";
 $("authTitle").textContent=signup?"Create your account":"Welcome back";
 $("authDescription").textContent=signup?"Create an account to manage your demo appointments.":"Sign in to view your saved demo appointments.";
 $("authTabSignIn").classList.toggle("selected",!signup);
 $("authTabSignUp").classList.toggle("selected",signup);
 $("authNameField").classList.toggle("hidden",!signup);
 $("authName").required=signup;
 $("authPassword").autocomplete=signup?"new-password":"current-password";
 $("authSubmit").innerHTML=(signup?"Create account":"Sign in")+' <span>→</span>';
 $("authSwitchText").innerHTML=signup?'Already have an account? <button type="button" id="switchToSignIn">Sign in</button>':'New to CarePoint? <button type="button" id="switchToSignUp">Create an account</button>';
 const switchBtn=$("switchToSignIn")||$("switchToSignUp");
 if(switchBtn)switchBtn.addEventListener("click",()=>setAuthMode(signup?"signin":"signup"));
}
function openAuth(mode){
 setAuthMode(mode);
 $("authModal").classList.remove("hidden");document.body.style.overflow="hidden";
 $("authPassword").value="";
 setTimeout(()=>(mode==="signup"?$("authName"):$("authEmail")).focus(),50);
}
function closeAuth(){
 $("authModal").classList.add("hidden");document.body.style.overflow="";
 $("authForm").reset();$("authPassword").type="password";$("togglePassword").textContent="Show";
}
function renderAuthState(){
 const session=getSession();
 const signInBtn=$("signInOpen"),signUpBtn=$("signUpOpen");
 if(session){
   signInBtn.textContent=`Hi, ${session.name.split(" ")[0]}`;
   signInBtn.onclick=()=>{if(confirm("Sign out of this demo account?")){localStorage.removeItem(SESSION_KEY);renderAuthState();showToast("You have signed out.");}};
   signUpBtn.textContent="Sign out";
   signUpBtn.onclick=()=>{localStorage.removeItem(SESSION_KEY);renderAuthState();showToast("You have signed out.");};
 }else{
   signInBtn.textContent="Sign in";signInBtn.onclick=()=>openAuth("signin");
   signUpBtn.innerHTML='Sign up <span>↗</span>';signUpBtn.onclick=()=>openAuth("signup");
 }
}
$("signInOpen").addEventListener("click",()=>{if(!getSession())openAuth("signin")});
$("signUpOpen").addEventListener("click",()=>{if(!getSession())openAuth("signup")});
$("closeAuthModal").addEventListener("click",closeAuth);
$("authModal").addEventListener("click",e=>{if(e.target===$("authModal"))closeAuth()});
$("authTabSignIn").addEventListener("click",()=>setAuthMode("signin"));
$("authTabSignUp").addEventListener("click",()=>setAuthMode("signup"));
$("togglePassword").addEventListener("click",()=>{$("authPassword").type=$("authPassword").type==="password"?"text":"password";$("togglePassword").textContent=$("authPassword").type==="password"?"Show":"Hide"});
$("authForm").addEventListener("submit",e=>{
 e.preventDefault();if(!e.currentTarget.reportValidity())return;
 const email=$("authEmail").value.trim().toLowerCase(),password=$("authPassword").value;
 const accounts=getAccounts();
 if(authMode==="signup"){
   if(accounts.some(a=>a.email===email)){showToast("An account with this email already exists. Please sign in.");return}
   const name=$("authName").value.trim();
   if(name.length<2){showToast("Please enter your full name.");return}
   // Demonstration only: plain-text localStorage passwords are NOT safe for real users.
   accounts.push({name,email,password,createdAt:new Date().toISOString()});
   try{localStorage.setItem(AUTH_KEY,JSON.stringify(accounts))}catch(err){showToast("Could not save account in this browser.");return}
   localStorage.setItem(SESSION_KEY,JSON.stringify({name,email}));
   closeAuth();renderAuthState();showToast("Account created successfully! You are signed in.");
 }else{
   const account=accounts.find(a=>a.email===email&&a.password===password);
   if(!account){showToast("Incorrect email or password. Please try again.");return}
   localStorage.setItem(SESSION_KEY,JSON.stringify({name:account.name,email:account.email}));
   closeAuth();renderAuthState();showToast("Signed in successfully. Welcome back!");
 }
});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("authModal").classList.contains("hidden"))closeAuth()});
renderAuthState();

$("year").textContent=new Date().getFullYear();
initDepartments();renderDoctors();renderAppointments();
