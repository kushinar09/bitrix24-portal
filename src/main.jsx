import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { ArrowDown, ArrowRight, Key, Webhook } from 'lucide-react'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      {/* Install Flow */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5" />
            Luồng Install Application
          </CardTitle>
          <CardDescription>Quy trình cài đặt ứng dụng vào Bitrix24 portal</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Step 1 */}
            <div className="p-4 border rounded-lg space-y-3">
              <Badge variant="secondary">Step 1</Badge>
              <h4 className="font-semibold">User Click Install</h4>
              <div className="text-sm space-y-2">
                <div className="bg-blue-50 p-2 rounded">
                  <strong>Bitrix24 → Your App</strong>
                  <br />
                  <code>GET /install?code=xxx&domain=yyy&state=zzz</code>
                </div>
                <div className="text-muted-foreground">
                  • <strong>code</strong>: authorization_code
                  <br />• <strong>domain</strong>: portal domain
                  <br />• <strong>state</strong>: security token
                </div>
              </div>
            </div>

            <ArrowRight className="hidden md:block w-6 h-6 self-center justify-self-center text-muted-foreground" />

            {/* Step 2 */}
            <div className="p-4 border rounded-lg space-y-3">
              <Badge variant="secondary">Step 2</Badge>
              <h4 className="font-semibold">Exchange Token</h4>
              <div className="text-sm space-y-2">
                <div className="bg-green-50 p-2 rounded">
                  <strong>Your App → Bitrix24</strong>
                  <br />
                  <code>POST /oauth/token/</code>
                </div>
                <div className="text-muted-foreground">
                  • <strong>grant_type</strong>: authorization_code
                  <br />• <strong>client_id</strong>: your client id
                  <br />• <strong>client_secret</strong>: your secret
                  <br />• <strong>code</strong>: auth code từ step 1
                </div>
              </div>
            </div>
          </div>

          <ArrowDown className="w-6 h-6 mx-auto text-muted-foreground" />

          {/* Step 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg space-y-3">
              <Badge variant="secondary">Step 3</Badge>
              <h4 className="font-semibold">Save Tokens</h4>
              <div className="text-sm space-y-2">
                <div className="bg-purple-50 p-2 rounded">
                  <strong>Database Operation</strong>
                </div>
                <div className="text-muted-foreground">
                  • Lưu access_token
                  <br />• Lưu refresh_token
                  <br />• Lưu domain info
                  <br />• Lưu expires_in
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg space-y-3">
              <Badge variant="secondary">Step 4</Badge>
              <h4 className="font-semibold">Register Webhooks</h4>
              <div className="text-sm space-y-2">
                <div className="bg-orange-50 p-2 rounded">
                  <strong>Your App → Bitrix24</strong>
                  <br />
                  <code>POST /rest/event.bind.json</code>
                </div>
                <div className="text-muted-foreground">
                  • <strong>event</strong>: ONCRMDEALADD
                  <br />• <strong>handler</strong>: your_url/handler
                  <br />• <strong>access_token</strong>: token
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Handler Flow */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Webhook className="w-5 h-5" />
            Luồng Handler (Webhook Events)
          </CardTitle>
          <CardDescription>Xử lý các sự kiện từ Bitrix24</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Step 1 */}
            <div className="p-4 border rounded-lg space-y-3">
              <Badge variant="destructive">Event</Badge>
              <h4 className="font-semibold">Bitrix24 Event</h4>
              <div className="text-sm space-y-2">
                <div className="bg-red-50 p-2 rounded">
                  <strong>Bitrix24 → Your App</strong>
                  <br />
                  <code>POST /handler</code>
                </div>
                <div className="text-muted-foreground">
                  • <strong>event</strong>: event type
                  <br />• <strong>data</strong>: event data
                  <br />• <strong>auth</strong>: auth info
                </div>
              </div>
            </div>

            <ArrowRight className="hidden md:block w-6 h-6 self-center justify-self-center text-muted-foreground" />

            {/* Step 2 */}
            <div className="p-4 border rounded-lg space-y-3">
              <Badge variant="destructive">Validate</Badge>
              <h4 className="font-semibold">Validate Request</h4>
              <div className="text-sm space-y-2">
                <div className="bg-yellow-50 p-2 rounded">
                  <strong>Security Check</strong>
                </div>
                <div className="text-muted-foreground">
                  • Check signature
                  <br />• Validate domain
                  <br />• Check token
                </div>
              </div>
            </div>

            <ArrowRight className="hidden md:block w-6 h-6 self-center justify-self-center text-muted-foreground" />

            {/* Step 3 */}
            <div className="p-4 border rounded-lg space-y-3">
              <Badge variant="destructive">Process</Badge>
              <h4 className="font-semibold">Business Logic</h4>
              <div className="text-sm space-y-2">
                <div className="bg-green-50 p-2 rounded">
                  <strong>Handle Event</strong>
                </div>
                <div className="text-muted-foreground">
                  • Process data
                  <br />• Update database
                  <br />• Call external APIs
                  <br />• Send notifications
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Spring Boot Methods */}
      <Card>
        <CardHeader>
          <CardTitle>Spring Boot Controller Methods</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Install Methods */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Install Controller</h4>

              <div className="p-3 border rounded-lg">
                <code className="text-sm font-mono">@PostMapping("/install")</code>
                <h5 className="font-semibold mt-2">handleInstall()</h5>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Tham số:</strong> code, domain, state
                  <br />
                  <strong>Tác dụng:</strong> Xử lý cài đặt app, đổi code thành token
                </p>
              </div>

              <div className="p-3 border rounded-lg">
                <code className="text-sm font-mono">exchangeAuthorizationCode()</code>
                <h5 className="font-semibold mt-2">Private Method</h5>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Tham số:</strong> code, domain, clientId, clientSecret
                  <br />
                  <strong>Tác dụng:</strong> Gọi API Bitrix24 để lấy access_token
                </p>
              </div>

              <div className="p-3 border rounded-lg">
                <code className="text-sm font-mono">saveTokens()</code>
                <h5 className="font-semibold mt-2">Service Method</h5>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Tham số:</strong> domain, accessToken, refreshToken, expiresIn
                  <br />
                  <strong>Tác dụng:</strong> Lưu tokens vào database
                </p>
              </div>

              <div className="p-3 border rounded-lg">
                <code className="text-sm font-mono">registerWebhooks()</code>
                <h5 className="font-semibold mt-2">Service Method</h5>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Tham số:</strong> domain, accessToken, webhookEvents[]
                  <br />
                  <strong>Tác dụng:</strong> Đăng ký các webhook events cần thiết
                </p>
              </div>
            </div>

            {/* Handler Methods */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Handler Controller</h4>

              <div className="p-3 border rounded-lg">
                <code className="text-sm font-mono">@PostMapping("/handler")</code>
                <h5 className="font-semibold mt-2">handleWebhook()</h5>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Tham số:</strong> WebhookRequest (event, data, auth)
                  <br />
                  <strong>Tác dụng:</strong> Nhận và phân phối webhook events
                </p>
              </div>

              <div className="p-3 border rounded-lg">
                <code className="text-sm font-mono">validateWebhookRequest()</code>
                <h5 className="font-semibold mt-2">Security Method</h5>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Tham số:</strong> request, signature, domain
                  <br />
                  <strong>Tác dụng:</strong> Validate tính hợp lệ của webhook request
                </p>
              </div>

              <div className="p-3 border rounded-lg">
                <code className="text-sm font-mono">processEvent()</code>
                <h5 className="font-semibold mt-2">Business Method</h5>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Tham số:</strong> eventType, eventData, authInfo
                  <br />
                  <strong>Tác dụng:</strong> Xử lý logic nghiệp vụ theo từng loại event
                </p>
              </div>

              <div className="p-3 border rounded-lg">
                <code className="text-sm font-mono">callBitrix24API()</code>
                <h5 className="font-semibold mt-2">API Method</h5>
                <p className="text-sm text-muted-foreground mt-1">
                  <strong>Tham số:</strong> domain, method, params, accessToken
                  <br />
                  <strong>Tác dụng:</strong> Gọi REST API của Bitrix24
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Calls Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Tóm tắt API Calls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-semibold">Outgoing API Calls (Your App → Bitrix24)</h4>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-blue-50 rounded">
                  <strong>POST /oauth/token/</strong> - Lấy access token
                </div>
                <div className="p-2 bg-green-50 rounded">
                  <strong>POST /rest/event.bind.json</strong> - Đăng ký webhook
                </div>
                <div className="p-2 bg-purple-50 rounded">
                  <strong>POST /rest/crm.deal.get.json</strong> - Lấy thông tin deal
                </div>
                <div className="p-2 bg-orange-50 rounded">
                  <strong>POST /rest/crm.contact.add.json</strong> - Tạo contact mới
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Incoming API Calls (Bitrix24 → Your App)</h4>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-red-50 rounded">
                  <strong>GET /install</strong> - Cài đặt ứng dụng
                </div>
                <div className="p-2 bg-yellow-50 rounded">
                  <strong>POST /handler</strong> - Nhận webhook events
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </StrictMode>,
)
