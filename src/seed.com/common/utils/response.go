package utils

type Resp struct {
	Code        string      `json:"code"`
	Message     string      `json:"message,omitempty"`
	Data        interface{} `json:"data"`
	RedirectURL string      `json:"redirectUri,omitempty"`
}

type File struct{}
