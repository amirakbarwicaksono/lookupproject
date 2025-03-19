package models

import (
	"time"

	"github.com/shopspring/decimal"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Representasi Data dalam Aplikasi Untuk user login
// Based on Reference Framework Data Analyst Lion Group
type User struct {
	ID         primitive.ObjectID `bson:"_id,omitempty"` // MongoDB ObjectID
	Username   string             `bson:"username"`      // Username for login
	Password   string             `bson:"password"`      // Hashed password
	StaffName  string             `bson:"staffname"`     // Staff's full name
	StaffEmail string             `bson:"staffemail"`    // Staff's email
	Access     []string           `bson:"access"`        // List of access permissions
	Keyword    []string           `bson:"keyword"`       // Associated keywords
}

// Representasi Data dalam Aplikasi untuk data yang diolah seperti datakof, datakif, datasof, datasif dll..
// Tambahkan sesuai dengan urutan data agar tidak bingung saat proses datanya.
type Datakof struct {
	SttNo            string          `bson:"STT No"`
	Kode             string          `bson:"Kode"`
	Bill             string          `bson:"Bill"`
	BookedDate       string          `bson:"Stt Booked Date"`
	PodDate          string          `bson:"Stt Pod Date"`
	LagRoute         string          `bson:"Lag Route"`
	Origin           string          `bson:"Origin"`
	Destination      string          `bson:"Destination"`
	Product          string          `bson:"Product"`
	ClientName       string          `bson:"Client Name"`
	ChargeableWeight decimal.Decimal `bson:"Chargeable Weight"` //change data from inteface{} to decimal.Decimal
	PublishRateCost  decimal.Decimal `bson:"Publish Rate Cost"` //change data from inteface{} to decimal.Decimal
	MitraCodeGenesis string          `bson:"Mitra Code Genesis"`
	OutboundFee      decimal.Decimal `bson:" Outbound Fee "` //change data from inteface{} to decimal.Decimal
	Ket              string          `bson:"Ket"`
	MitraType        string          `bson:"Mitra Type"`
	Pic              string          `bson:"Pic"`
}

type Datakif struct {
	SttNo            string          `bson:"STT No"`
	Kode             string          `bson:"Kode"`
	Bill             string          `bson:"Bill"`
	BookedDate       string          `bson:"Stt Booked Date"`
	PodDate          string          `bson:"Stt Pod Date"`
	LagRoute         string          `bson:"Lag Route"`
	Origin           string          `bson:"Origin"`
	Destination      string          `bson:"Destination"`
	Product          string          `bson:"Product"`
	ClientName       string          `bson:"Client Name"`
	ChargeableWeight decimal.Decimal `bson:"Chargeable Weight"` //change data from inteface{} to decimal.Decimal
	PublishRateCost  decimal.Decimal `bson:"Publish Rate Cost"` //change data from inteface{} to decimal.Decimal
	MitraCodeGenesis string          `bson:"Mitra Code Genesis"`
	InboundFee       decimal.Decimal `bson:" Inbound Fee "` //change data from inteface{} to decimal.Decimal
	Ket              string          `bson:"Ket"`
	MitraType        string          `bson:"Mitra Type"`
	Pic              string          `bson:"Pic"`
}

type Datasof struct {
	SttNo            string          `bson:"STT No"`
	Kode             string          `bson:"Kode"`
	Bill             string          `bson:"Bill"`
	BookedDate       string          `bson:"Stt Booked Date"`
	PodDate          string          `bson:"Stt Pod Date"`
	LagRoute         string          `bson:"Lag Route"`
	Origin           string          `bson:"Origin"`
	Destination      string          `bson:"Destination"`
	Product          string          `bson:"Product"`
	ClientName       string          `bson:"Client Name"`
	ChargeableWeight decimal.Decimal `bson:"Chargeable Weight"` //change data from inteface{} to decimal.Decimal
	PublishRateCost  decimal.Decimal `bson:"Publish Rate Cost"` //change data from inteface{} to decimal.Decimal
	MitraCodeGenesis string          `bson:"Mitra Code Genesis"`
	OutboundFee      decimal.Decimal `bson:" Outbound Fee "` //change data from inteface{} to decimal.Decimal
	Ket              string          `bson:"Ket"`
	MitraType        string          `bson:"Mitra Type"`
	Pic              string          `bson:"Pic"`
}

type Datasif struct {
	SttNo            string          `bson:"STT No"`
	Kode             string          `bson:"Kode"`
	Bill             string          `bson:"Bill"`
	BookedDate       string          `bson:"Stt Booked Date"`
	PodDate          string          `bson:"Stt Pod Date"`
	LagRoute         string          `bson:"Lag Route"`
	Origin           string          `bson:"Origin"`
	Destination      string          `bson:"Destination"`
	Product          string          `bson:"Product"`
	ClientName       string          `bson:"Client Name"`
	ChargeableWeight decimal.Decimal `bson:"Chargeable Weight"` //change data from inteface{} to decimal.Decimal
	PublishRateCost  decimal.Decimal `bson:"Publish Rate Cost"` //change data from inteface{} to decimal.Decimal
	MitraCodeGenesis string          `bson:"Mitra Code Genesis"`
	InboundFee       decimal.Decimal `bson:" Inbound Fee "` //change data from inteface{} to decimal.Decimal
	Ket              string          `bson:"Ket"`
	MitraType        string          `bson:"Mitra Type"`
	Pic              string          `bson:"Pic"`
}

type Datapof struct {
	SttNo            string          `bson:"STT No"`
	Kode             string          `bson:"Kode"`
	Bill             string          `bson:"Bill"`
	BookedDate       string          `bson:"Stt Booked Date"`
	PodDate          string          `bson:"Stt Pod Date"`
	LagRoute         string          `bson:"Lag Route"`
	Origin           string          `bson:"Origin"`
	Destination      string          `bson:"Destination"`
	Product          string          `bson:"Product"`
	ClientName       string          `bson:"Client Name"`
	ChargeableWeight decimal.Decimal `bson:"Chargeable Weight"`   //change data from inteface{} to decimal.Decimal
	PublishRateCost  decimal.Decimal `bson:" Publish Rate Cost "` //change data from inteface{} to decimal.Decimal
	MitraCodeGenesis string          `bson:"Mitra Code Genesis"`
	PickupFee        decimal.Decimal `bson:"Pickup Fee"` //change data from inteface{} to decimal.Decimal
	Ket              string          `bson:"Ket"`
	Pic              string          `bson:"Pic"`
}

// //Data Before
// type Datafro struct {
// 	SttNo             string      `bson:"STT No"`
// 	Kode              string      `bson:"Kode"`
// 	Bill              string      `bson:"Bill"`
// 	BookedDate        string      `bson:"Stt Booked Date"`
// 	PodDate           string      `bson:"Stt Pod Date"`
// 	LagRoute          string      `bson:"Lag Route"`
// 	Origin            string      `bson:"Origin"`
// 	Destination       string      `bson:"Destination"`
// 	Product           string      `bson:"Product"`
// 	ClientName        string      `bson:"Client Name"`
// 	ChargeableWeight  decimal.Decimal `bson:"Chargeable Weight"`
// 	PublishRateCost   decimal.Decimal `bson:"Publish Rate Cost"`
// 	MitraCodeGenesis  string      `bson:"Mitra Code Genesis"`
// 	ForwardrateOrigin decimal.Decimal `bson:"Forward Rate Origin"`
// 	Ket               string      `bson:"Ket"`
// 	Pic               string      `bson:"Pic"`
// }
// type Datafrd struct {
// 	SttNo             string      `bson:"STT No"`
// 	Kode              string      `bson:"Kode"`
// 	Bill              string      `bson:"Bill"`
// 	BookedDate        string      `bson:"Stt Booked Date"`
// 	PodDate           string      `bson:"Stt Pod Date"`
// 	LagRoute          string      `bson:"Lag Route"`
// 	Origin            string      `bson:"Origin"`
// 	Destination       string      `bson:"Destination"`
// 	Product           string      `bson:"Product"`
// 	ClientName        string      `bson:"Client Name"`
// 	ChargeableWeight  decimal.Decimal `bson:"Chargeable Weight"`
// 	PublishRateCost   decimal.Decimal `bson:"Publish Rate Cost"`
// 	MitraCodeGenesis  string      `bson:"Mitra Code Genesis"`
// 	ForwardrateOrigin decimal.Decimal `bson:"Forward Rate Origin"`
// 	Ket               string      `bson:"Ket"`
// 	Pic               string      `bson:"Pic"`
// }

type Datafro struct {
	SttNo             string          `bson:"STT No"`
	Kode              string          `bson:"Kode"`
	Bill              string          `bson:"Bill"`
	BookedDate        string          `bson:"Stt Booked Date"`
	PodDate           string          `bson:"Stt Pod Date"`
	LagRoute          string          `bson:"Lag Route"`
	Origin            string          `bson:"Origin"`
	Destination       string          `bson:"Destination"`
	Product           string          `bson:"Product"`
	ClientName        string          `bson:"Client Name"`
	ChargeableWeight  decimal.Decimal `bson:"Chargeable Weight"` //change data from inteface{} to decimal.Decimal
	PublishRateCost   decimal.Decimal `bson:"Publish Rate Cost"` //change data from inteface{} to decimal.Decimal
	MitraCodeGenesis  string          `bson:"Mitra Code Genesis"`
	ForwardrateOrigin decimal.Decimal `bson:"Forward Rate Origin"` //change data from inteface{} to decimal.Decimal
	Ket               string          `bson:"Ket"`
	Pic               string          `bson:"Pic"`
}

type Datafrd struct {
	SttNo                  string          `bson:"STT No"`
	Kode                   string          `bson:"Kode"`
	Bill                   string          `bson:"Bill"`
	BookedDate             string          `bson:"Stt Booked Date"`
	PodDate                string          `bson:"Stt Pod Date"`
	LagRoute               string          `bson:"Lag Route"`
	Origin                 string          `bson:"Origin"`
	Destination            string          `bson:"Destination"`
	Product                string          `bson:"Product"`
	ClientName             string          `bson:"Client Name"`
	ChargeableWeight       decimal.Decimal `bson:"Chargeable Weight"`   //change data from inteface{} to decimal.Decimal
	PublishRateCost        decimal.Decimal `bson:" Publish Rate Cost "` //change data from inteface{} to decimal.Decimal
	MitraCodeGenesis       string          `bson:"Mitra Code Genesis"`
	ForwardRateDestination decimal.Decimal `bson:"Forward Rate Destination"` //change data from inteface{} to decimal.Decimal
	Ket                    string          `bson:"Ket"`
	Pic                    string          `bson:"Pic"`
}

// added new Delivery Fee
type Datadef struct {
	SttNo                    string          `bson:"STT No"`
	Kode                     string          `bson:"Kode"`
	Bill                     string          `bson:"Bill"`
	SttBookedDate            string          `bson:"Stt Booked Date"`
	SttPodDate               string          `bson:"Stt Pod Date"` //tambahan baru request lion parcel
	Origin                   string          `bson:"Origin"`
	Destination              string          `bson:"Destination"`
	Product                  string          `bson:"Product"`
	ClientName               string          `bson:"Client Name"`
	ChargeableWeight         decimal.Decimal `bson:"Chargeable Weight"` //change data from inteface{} to decimal.Decimal
	PublishRateCost          decimal.Decimal `bson:"Publish Rate Cost"` //change data from inteface{} to decimal.Decimal
	MitraCodeGenesis         string          `bson:"Mitra Code Genesis"`
	DeliveryFee              decimal.Decimal `bson:"Delivery Fee"`                     //change data from inteface{} to decimal.Decimal
	Bonus                    decimal.Decimal `bson:"Bonus"`                            //change data from inteface{} to decimal.Decimal
	TotalDeliveryFeeAndBonus decimal.Decimal `bson:"Total Delivery Fee + Bonus Mitra"` //change data from inteface{} to decimal.Decimal
	Ket                      string          `bson:"Ket"`
	Pic                      string          `bson:"Pic"`
}

// added new KVP Delivery Fee
type Datakdf struct {
	BalanceHistoryId      decimal.Decimal `bson:"balance_history_id"` //change data from inteface{} to decimal.Decimal
	CourierId             string          `bson:"courier_id"`
	BalanceType           string          `bson:"balance_type"`
	BalanceAmount         decimal.Decimal `bson:"balance_amount"`         //change data from inteface{} to decimal.Decimal
	CurrentBallanceAmount decimal.Decimal `bson:"current_balance_amount"` //change data from inteface{} to decimal.Decimal
	TransactionType       string          `bson:"transaction_type"`
	TransactionNote       string          `bson:"transaction_note"`
	BankId                string          `bson:"bank_id"`
	BankAccountOwner      string          `bson:"bank_account_owner"`
	BankAccountNumber     string          `bson:"bank_account_number"`
	CreatedAt             string          `bson:"created_at"`
	T                     string          `bson:"T"`
	Type                  string          `bson:"Type"`
}

// added new KVP Pick Up Fee
type Datakpf struct {
	BalanceHistoryId      decimal.Decimal `bson:"balance_history_id"` //change data from inteface{} to decimal.Decimal
	CourierId             string          `bson:"courier_id"`
	BalanceType           string          `bson:"balance_type"`
	BalanceAmount         decimal.Decimal `bson:"balance_amount"`         //change data from inteface{} to decimal.Decimal
	CurrentBallanceAmount decimal.Decimal `bson:"current_balance_amount"` //change data from inteface{} to decimal.Decimal
	TransactionType       string          `bson:"transaction_type"`
	TransactionNote       string          `bson:"transaction_note"`
	BankId                string          `bson:"bank_id"`
	BankAccountOwner      string          `bson:"bank_account_owner"`
	BankAccountNumber     string          `bson:"bank_account_number"`
	CreatedAt             string          `bson:"created_at"`
	T                     string          `bson:"T"`
	Type                  string          `bson:"Type"`
}

type Datatfs struct {
	KodeSubConsol    string          `bson:"KodeSubConsol"`
	MitraCodeGenesis string          `bson:"Mitra Code Genesis"`
	Bill             string          `bson:"Bill"`
	SttNumbers       string          `bson:"STTNumbers"`
	Kode             string          `bson:"Kode"`
	Rute             string          `bson:"Rute"`
	SttDate          string          `bson:"STTDate"`
	Origin           string          `bson:"Origin"`
	Destination      string          `bson:"Destination"`
	Berat            decimal.Decimal `bson:"Berat"`            //change data from inteface{} to decimal.Decimal
	RatePerKg        decimal.Decimal `bson:"RatePerKg"`        //change data from inteface{} to decimal.Decimal
	TruckingFee      decimal.Decimal `bson:"Trucking(STT)Fee"` //change data from inteface{} to decimal.Decimal
	Keterangan       string          `bson:"Keterangan"`
	CreatedBy        string          `bson:"CreatedBy"`
	Type             string          `bson:"Type"`
}

type Datatft struct {
	KodeSubConsol    string          `bson:"KodeSubConsol"`
	MitraCodeGenesis string          `bson:"Mitra Code Genesis"`
	Bill             string          `bson:"Bill"`
	SttNumbers       string          `bson:"STTNumbers"`
	Kode             string          `bson:"Kode"`
	SttDate          string          `bson:"STTDate"`
	Origin           string          `bson:"Origin"`
	Destination      string          `bson:"Destination"`
	Berat            decimal.Decimal `bson:"Berat"`            //change data from inteface{} to decimal.Decimal
	RatePerKg        decimal.Decimal `bson:"RatePerKg"`        //change data from inteface{} to decimal.Decimal
	TruckingFee      decimal.Decimal `bson:"Trucking(TUC)Fee"` //change data from inteface{} to decimal.Decimal
	Keterangan       string          `bson:"Keterangan"`
	CreatedBy        string          `bson:"CreatedBy"`
	Type             string          `bson:"Type"`
}

//Batas representasi data dalam aplikasi untuk data yang diolah
//tambahkan diatas baris komentar ini jika ada representasi data baru yang akan diolah.

//Representasi data dalam aplikasi untuk data master yang akan di vlookup
// Tambahkan sesuai dengan urutan representasi baru agar data tidak  bingung saat proses datanya.

type Mastermn_1 struct {
	//ID                      primitive.ObjectID `bson:"_id,omitempty"`
	MitraCodeGenesis        string `bson:"Mitra Code Genesis"`
	NamaMitra               string `bson:"Nama Mitra"`
	MitraNamaWthConcatinate string `bson:"Mitra Nama Wth Concatinate"`
	Kategori                string `bson:"Kategori"`
	ThreeLC                 string `bson:"3LC"` // Using `ThreeLC` for readability in Golang
	City                    string `bson:"City"`
}

type Masteric_2 struct {
	//ID                     primitive.ObjectID `bson:"_id,omitempty"`
	STTNo                  string          `bson:"STT No"`
	STTBookedAt            string          `bson:"STT Booked At"` // Could use time.Time if dates are stored as ISODate
	ClientName             string          `bson:"Client Name"`
	Origin                 string          `bson:"Origin"`
	ForwardAreaOrigin      string          `bson:"Forward Area Origin"`
	Destination            string          `bson:"Destination"`
	ForwardAreaDestination string          `bson:"Forward Area Destination"`
	Product                string          `bson:"Product"`
	GrossWeight            decimal.Decimal `bson:"Gross Weight"`             //all tipe data change to decimal.Decimal for LP Req 24022025
	ChargeableWeight       decimal.Decimal `bson:"Chargeable Weight"`        // before all data is float64
	ForwardRateOrigin      decimal.Decimal `bson:"Forward Rate Origin"`      //,omitempty"`
	ForwardRateDestination decimal.Decimal `bson:"Forward Rate Destination"` //,omitempty"`
	CODAmount              decimal.Decimal `bson:"COD Amount"`               //,omitempty"`
	CargoCategory          string          `bson:"Cargo Category"`
	RouteType              string          `bson:"Route Type"`
	FirstAWBNumber         string          `bson:"First AWB Number"`
	LastAWBNumber          string          `bson:"Last AWB Number"`
	LagRoute               string          `bson:"Lag Route"`
	LagModa                string          `bson:"Lag Moda"`
	ClientCategory         string          `bson:"Client Category"`
	PublishRateFeeFixed    string          `bson:" PublishRateFeeFixed "` // Could use float64 if parsing the value
}

type Masterls_3 struct {
	STTNo               string `bson:"STT No"`
	STTBookedAT         string `bson:"STT Booked AT"`
	LastStatus          string `bson:"Last Status"`
	STTUpdatedActorName string `bson:"STT Updated Actor Name"`
}

type Mastertbs_4 struct {
	//ID   primitive.ObjectID `bson:"_id,omitempty"`
	Kode string `bson:"Kode"`
	Bill string `bson:"Bill"`
}

type Mastertbs_41 struct {
	//ID   primitive.ObjectID `bson:"_id,omitempty"`
	Kode string `bson:"Kode"`
	Bill string `bson:"Bill"`
}

type Mastertbs_42 struct {
	//ID   primitive.ObjectID `bson:"_id,omitempty"`
	Kode string `bson:"Kode"`
	Bill string `bson:"Bill"`
}

type Mastertbs_43 struct {
	//ID   primitive.ObjectID `bson:"_id,omitempty"`
	Kode string `bson:"Kode"`
	Bill string `bson:"Bill"`
}

type Mastertbs_44 struct {
	//ID   primitive.ObjectID `bson:"_id,omitempty"`
	Kode string `bson:"Kode"`
	Bill string `bson:"Bill"`
}

type Mastertbs_45 struct { //tambahan baru
	//ID   primitive.ObjectID `bson:"_id,omitempty"`
	KodeFro string `bson:"KodeFro"`
	Bill    string `bson:"Bill"`
}

type Mastertbs_46 struct { //tambahan baru
	//ID   primitive.ObjectID `bson:"_id,omitempty"`
	KodeFrd string `bson:"KodeFrd"`
	Bill    string `bson:"Bill"`
}

type Mastertbs_47 struct { //tambahan baru
	//ID   primitive.ObjectID `bson:"_id,omitempty"`
	KodeDef string `bson:"KodeDef"`
	Bill    string `bson:"Bill"`
}

type Mastertbs_48 struct { //tambahan baru
	//ID   primitive.ObjectID `bson:"_id,omitempty"`
	KodeTfs string `bson:"KodeTfs"`
	Bill    string `bson:"Bill"`
}

type Mastertbs_49 struct { //tambahan baru
	//ID   primitive.ObjectID `bson:"_id,omitempty"`
	KodeTft string `bson:"KodeTft"`
	Bill    string `bson:"Bill"`
}

type Mastertbs_50 struct { //tambahan baru
	//ID   primitive.ObjectID `bson:"_id,omitempty"`
	KodeKpf string `bson:"KodeKpf"`
	Bill    string `bson:"Bill"`
}

type Mastertbs_51 struct { //tambahan baru
	//ID   primitive.ObjectID `bson:"_id,omitempty"`
	KodeKdf string `bson:"KodeKdf"`
	Bill    string `bson:"Bill"`
}

type Masterbc_5 struct {
	STTId            string          `bson:"Stt ID"`                // Stt ID
	Date             string          `bson:"Stt Date"`              // Stt Date
	ChargeableWeight decimal.Decimal `bson:"Stt Chargeable Weight"` // Stt Chargeable Weight
	InvoiceNumber    string          `bson:"Invoice/Number"`        // Invoice/Number
}

type Masterrg_6 struct {
	Productroute string `bson:"Productroute"`
	RouteHubCost string `bson:"route_hub_cost"`
}

// Definisi struct untuk merepresentasikan data District
type Masterrf_7 struct {
	DistrictName  string `bson:"District Name"`        // District Name
	FwdBaseOrigin int    `bson:"FWD Base Origin"`      // FWD Base Origin
	FwdBaseDest   int    `bson:"FWD Base Destination"` // FWD Base Destination
	Keterangan    string `bson:"Keterangan"`           // Keterangan
}

// Definisi struct untuk merepresentasikan data Mitra
type Masterrt_8 struct {
	MitraCodeGenesisVendorName string          `bson:"Mitra Code Genesis / Vendor Name"` // Vendor Name
	Rute                       string          `bson:"Rute"`                             // Rute
	Origin                     string          `bson:"Origin"`                           // Origin
	Destination                string          `bson:"Destination"`                      // Destination
	TruckRate                  decimal.Decimal `bson:"Truck Rate"`                       // Truck Rate /allso change from int to decimal.Decimal
	TLC                        string          `bson:"TLC"`                              // TLC
}

// tambahan untuk dTPOL Delivery Fee
type Masterdl_9 struct {
	STTNo                 string          `bson:"STT No"`
	BookedAt              time.Time       `bson:"Booked At"`
	StartingStatus        string          `bson:"Starting Status"`
	UpdatedByPartner      string          `bson:"Updated By Partner"`
	DeliveryFeePercentage string          `bson:"Delivery Fee Percentage"`
	STTType               string          `bson:"STT Type"`
	Remarks               string          `bson:"Remarks"`
	PublishRateCost       decimal.Decimal `bson:"Publish Rate Cost"`     // float64
	ChargeableWeight      decimal.Decimal `bson:"Chargeable Weight"`     //change data before interface{} to decimal.Decimal
	DeliveryFee           decimal.Decimal `bson:"Delivery Fee"`          //float64
	BonusPinalti          decimal.Decimal `bson:"Bonus/Pinalti"`         //float64
	TotalBonusPinalti     decimal.Decimal `bson:"Total Bonus / Pinalti"` //float64
}

type Mastermt_10 struct {
	Manifest                  string          `bson:"Manifest"`
	CreatedAt                 time.Time       `bson:"Created At"`
	Rute                      string          `bson:"Rute"`
	ManifestCustomGrossWeight decimal.Decimal `bson:"Manifest Custom Gross Weight"`
	TruckAppsValidation       string          `bson:"Truck Apps Validation"`
}

//Batas representasi data dalam aplikasi untuk data master
//tambahkan diatas baris komentar ini jika ada representasi data baru yang diinput sebagai master.

// UploadLog function
type CollectionAction struct {
	Name    string // Nama koleksi
	Replace bool   // Flag apakah memerlukan penggantian data
}

type UploadLog struct {
	CollectionName string    `bson:"collection_name"`
	CSVTotalCount  int       `bson:"csv_total_count"`
	RecordCount    int       `bson:"record_count"`
	UploadedAt     time.Time `bson:"uploaded_at"`
	Status         string    `bson:"status"`
	ErrorMessage   string    `bson:"error_message,omitempty"`
	UploadedBy     string    `bson:"uploaded_by"`
	DataBefore     int64     `bson:"data_before"`
	DataAfter      int64     `bson:"data_after"`
	DuplicateCount int       `bson:"duplicate_count"`
	Action         string    `bson:"action"` // Add this field to track the action
	Month          string    `bson:"month"`  // aktifkan ini nanti
}
