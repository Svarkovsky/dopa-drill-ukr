package com.svarkovsky.dopadrill

import android.content.Context
import fi.iki.elonen.NanoHTTPD
import java.io.InputStream

class LocalGameServer(private val context: Context, port: Int = 18080) :
    NanoHTTPD(null, port) {

    override fun serve(session: IHTTPSession): Response {
        var uri = session.uri
        if (uri == "/" || uri.isEmpty()) {
            uri = "/index.html"
        }
        val cleanPath = uri.removePrefix("/")

        return try {
            val stream: InputStream = context.assets.open(cleanPath)
            val mimeType = getMimeType(cleanPath)
            newChunkedResponse(Response.Status.OK, mimeType, stream).apply {
                addHeader("Access-Control-Allow-Origin", "*")
                addHeader("Cache-Control", "no-cache, no-store, must-revalidate")
            }
        } catch (e: Exception) {
            newFixedLengthResponse(
                Response.Status.NOT_FOUND,
                MIME_PLAINTEXT,
                "404 Not Found: $cleanPath"
            )
        }
    }

    private fun getMimeType(path: String): String {
        return when {
            path.endsWith(".html") -> "text/html; charset=utf-8"
            path.endsWith(".js") || path.endsWith(".mjs") -> "application/javascript; charset=utf-8"
            path.endsWith(".css") -> "text/css; charset=utf-8"
            path.endsWith(".svg") -> "image/svg+xml"
            path.endsWith(".woff2") -> "font/woff2"
            path.endsWith(".json") -> "application/json"
            path.endsWith(".png") -> "image/png"
            path.endsWith(".ico") -> "image/x-icon"
            else -> "application/octet-stream"
        }
    }
}
